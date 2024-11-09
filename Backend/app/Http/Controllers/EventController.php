<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage; // Import Storage facade
use App\Rules\TimeRule; 

use App\Models\Guests;
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

        // Encode the cover photo if it exists
        foreach ($events as $event) {
            if ($event->cover_photo) {
                // Assuming cover_photo is a path to the image file, encode it as Base64
                $event->cover_photo = 'data:image/jpeg;base64,' . base64_encode(Storage::disk('public')->get($event->cover_photo));
            }
        }

        // Return the events as a JSON response
        return response()->json($events);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'pax' => 'required|integer',
            'venue' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'cover_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:16384', // 16MB limit
        ], [
            'cover_photo.max' => 'The cover photo must not exceed 16MB.',
        ]);

        $event = new Event();
        $event->name = $request->name;
        $event->date = $request->date;
        $event->pax = $request->pax;
        $event->venue = $request->venue;
        $event->type = $request->type;

        // Handle the cover photo if it exists
        if ($request->hasFile('cover_photo')) {
            $coverPhotoPath = $request->file('cover_photo')->store('cover_photos', 'public');
            $event->cover_photo = $coverPhotoPath; // Save the file path
        }

        $event->save();

        return response()->json(['message' => 'Event created successfully!', 'event' => $event], 201);
    }

    public function eventsForDay($date)
    {
        $events = Event::whereDate('date', $date)->get();
        return response()->json($events);
    }

 
 

    // public function show($eventId)
    // {
    //     // Retrieve the event by ID
    //     $event = Event::with('guests')->find($eventId);

    //     // Check if the event exists
    //     if (!$event) {
    //         return response()->json(['error' => 'Event not found'], 404);
    //     }

    //     // Return the event details as a JSON response
    //     return response()->json($event);
    // }
    public function showEventById($eventId)
    {
        try {
            // Log::debug("Fetching event with ID: $eventId");
            $event = Event::find($eventId);
    
            if (!$event) {
                // Log::error("Event with ID $eventId not found");
                return response()->json(['error' => 'Event not found'], 404);
            }
    
            return response()->json($event);
        } catch (\Throwable $th) {
            // Log::error("An error occurred while fetching the event: " . $th->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching the event',
            ], 500);
        }
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

}