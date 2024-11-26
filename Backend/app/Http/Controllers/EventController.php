<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Guests;
use App\Models\Equipment;
use App\Models\Package;
use App\Models\Service;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
class EventController extends Controller
{
    //Add a method to fetch all events
    public function index()
{
    // Fetch all events
    $events = Event::all();

    // Return the events as a JSON response
    return response()->json($events);
}
 public function eventsForDay($date)
{
    $events = Event::whereDate('date', $date)->get();
    return response()->json($events);
}
public function store(Request $request)
{
    try {
        // Ensure user is authenticated
        $user = Auth::user();
        // return response()->json($user, 200);
        if (!$user) {   
            return response()->json(['message' => 'Unauthorized. Please log in.'], 401);
        }

        // Validate the incoming request
        $validatedData = $request->validate([
            'eventName' => 'required|string|max:255',
            'eventType' => 'required|string',
            'eventPax' => 'required|numeric|min:1',
            'eventDate' => 'required|date',
            'eventTime' => 'required|date_format:H:i',
            'eventStatus' => 'required|string', // e.g., Tentative, Booked, etc.
            'eventLocation' => 'required|string',
            'description' => 'required|string',
            'coverPhoto' => 'nullable|string', // !#TODO kani ang problema oh url sja pero sa db string. c
            'totalPrice' => 'nullable|integer',
            // 'package_id' => 'required|exists:packages,id',
            'packages' => 'nullable|array',
            'guests' => 'required|array',
            'guests.*.GuestName' => 'required|string|max:255',
            'guests.*.email' => 'required|email',
            'guests.*.phone' => 'required|string|max:15',
            'guests.*.role' => 'required|string|max:15',
        ]);

        // Attach user ID to validated data
        $validatedData['user_id'] = $user->id;
        
        // Ensure that 'packages' is set to an empty array if not provided
        if (!isset($validatedData['packages'])) {
            $validatedData['packages'] = []; // Default to an empty array if services are not provided
        }

        // Create the event with package association
        $event = Event::create([
            'name' => $validatedData['eventName'],
            'type' => $validatedData['eventType'],
            'pax' => $validatedData['eventPax'],
            'date' => $validatedData['eventDate'],
            'time' => $validatedData['eventTime'],
            'status' => $validatedData['eventStatus'],
            'location' => $validatedData['eventLocation'],
            'description' => $validatedData['description'],
            'cover_photo' => $validatedData['coverPhoto'],
            // 'package_id' => $validatedData['package_id'],
            'packages' => json_encode($validatedData['packages']), // Store packages as JSON
            'user_id' => $validatedData['user_id'], // Now user_id is explicitly set
        ]);


        if (isset($validatedData['packages']) && count($validatedData['packages']) > 0) {
            foreach ($validatedData['packages'] as $packageId) {
                DB::table('event_packages')->insert([
                    'event_id' => $event->id,
                    'package_id' => $packageId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        // Create equipment records for the event
        foreach ($validatedData['packages'] as $packageId) {
            $package = Package::find($packageId);
            $services = json_decode($package->services, true);

            foreach ($services as $serviceId) {
                $service = Service::find($serviceId);
                $equipment = Equipment::create([
                    'event_id' => $event->id,
                    'service_id' => $serviceId,
                    'user_id' => $service->user_id,
                ]);
            }
        }

        // Add guests to the event
        foreach ($validatedData['guests'] as $guestData) {
            Guests::create([
                'event_id' => $event->id,
                'GuestName' => $guestData['GuestName'],
                'email' => $guestData['email'],
                'phone' => $guestData['phone'],
                'role' => $guestData['role'],
            ]);
        }

        return response()->json([$event->load('package'), $user], 201); // Include package in response
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Validation failed.',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
}


public function fetchEventsByType(Request $request)
{
    try {
        $eventType = $request->input('type'); // Get the 'eventType' parameter from the request

        if (!$eventType) {
            return response()->json(['error' => 'Event type is required'], 400); // Return error if eventType is not provided
        }

        // Fetch events that match the provided event type
        $events = Event::where('type', $eventType)->get();

        if ($events->isEmpty()) {
            return response()->json(['error' => 'No events found for this type'], 404); // Return error if no events are found
        }

        return response()->json($events); // Return the filtered events as a JSON response

    } catch (\Exception $e) {
        \Log::error('Error fetching events by type: ' . $e->getMessage());
        return response()->json(['error' => 'Failed to fetch events'], 500); // Return error if something goes wrong
    }
}

public function getEventsWithMyServices(Request $request)
{
    $userId = Auth::id();
    $myServices = Service::where('user_id', $userId)->pluck('id');
    $packages = Package::whereHas('services', function ($query) use ($myServices) {
        $query->whereIn('service_id', $myServices);
    })->pluck('id');
    $events = Event::whereHas('packages', function ($query) use ($packages) {
        $query->whereIn('package_id', $packages);
    })->get();

    return response()->json($events);
}

public function fetchEventsByDate($date)
{
        try {
                // Get the count of events on a specific date
                $eventsCount = Event::whereDate('date', $date)
                ->selectRaw('count(*) as count')
                        ->first();

                    if ($eventsCount->count >= 3) {
                        return response()->json(['count' => $eventsCount->count]);
                    } else {
                        return response()->json(['count' => 0]);
                    }
                } catch (\Throwable $th) {
                    //throw $th;
                    return response()->json(['message' => $th->getMessage()], 500);
                } catch (\Exception $e) {
                    return response()->json([
                        'status' => 'error',
                        'message' => $e->getMessage(),
                    ], 500);
         }
}
 
public function showEventById($eventId)
{
    try {
        $event = Event::with('guests')->find($eventId);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        return response()->json($event);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'An error occurred while fetching the event',
        ], 500);
    }
}

    public function getEventsByType($type)
{
    $events = Event::where('type', $type)->get();
    return response()->json($events);
}
    public function updateEvent(Request $request, $eventId)
    {
        DB::beginTransaction();

        try {
            $event = Event::find($eventId);

            if (!$event) {
                return response()->json(['error' => 'Event not found'], 404);
            }

            $validatedData = $request->validate([
                'status' => 'required|string',
            ]);

            $event->update($validatedData);

            DB::commit();

            return response()->json(['message' => 'Event status updated successfully'], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function archiveEvent($eventId)
    {
        DB::beginTransaction();

        try {
            $event = Event::find($eventId);

            if (!$event) {
                return response()->json(['error' => 'Event not found'], 404);
            }

            // Set the event as archived
            $event->archived = true;
            $event->save();

            DB::commit();

            return response()->json(['message' => 'Event archived successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
// Fetch all active events
    public function getActiveEvents()
    {
        $events = Event::where('archived', false)->get();
        return response()->json($events);
    }

    // Fetch all archived events
    public function getArchivedEvents()
    {
        $events = Event::where('archived', true)->get();
        return response()->json($events);
    }

    //function to softdelete event
    public function deleteEvent($id)
    {
        try {
            $event = Event::findOrFail($id);

            // perform soft dekeying
            $event->delete(); 
            return response()->json([
                'success' => true,
                'message' => 'Event Deleted Successfully',  //
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message' => $th->getMessage()], 500);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found or could not be deleted',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    // Method to retrieve deleted events
    public function restoreEvent($id)
    {
        try {
            $event = Event::withTrashed()->findOrFail($id);

            $event->restore();

            return response()->json([
                'success' => true,
                'message' => 'Event restored successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found or could not be restored',
                'error' => $e->getMessage(),
            ], 404);
        }
    }



// In your EventController.php
public function getEventsByUserId($userId)
{
    try {
        $events = Event::where('user_id', $userId)->get(); // Use $userId directly
        return response()->json($events, 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch events'], 500);
    }
}




    
}
