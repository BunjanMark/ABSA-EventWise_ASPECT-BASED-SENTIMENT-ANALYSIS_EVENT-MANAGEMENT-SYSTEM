<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Guests;
use Illuminate\Support\Facades\DB;

class GuestsController extends Controller
{
    // Fetch all events with guests
    public function index()
    {
        $events = Event::with('guests')->get();
        return response()->json($events, 200);
    }

    // Store a new event with guests
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            // Validate event and guest data
            $validatedData = $request->validate([
                'eventName' => 'required|string|max:255',
                'eventType' => 'required|string',
                'eventDate' => 'required|date',
                'eventTime' => 'required|date_format:H:i',
                'eventLocation' => 'required|string',
                'description' => 'nullable|string',
                'coverPhoto' => 'nullable|url',
                'guests' => 'required|array',
                'guests.*.GuestName' => 'required|string|max:255',
                'guests.*.email' => 'required|email',
                'guests.*.phone' => 'nullable|string|max:15',
            ]);

            // Create the event
            $event = Event::create([
                'name' => $validatedData['eventName'],
                'type' => $validatedData['eventType'],
                'date' => $validatedData['eventDate'],
                'time' => $validatedData['eventTime'],
                'location' => $validatedData['eventLocation'],
                'description' => $validatedData['description'] ?? 'No description available',
                'cover_photo' => $validatedData['coverPhoto'] ?? null,
            ]);

            // Create guests and associate them with the event
            foreach ($validatedData['guests'] as $guestData) {
                $event->guests()->create([
                    'GuestName' => $guestData['GuestName'],
                    'email' => $guestData['email'],
                    'phone' => $guestData['phone'] ?? null,
                ]);
            }

            DB::commit();

            return response()->json(['event' => $event, 'guests' => $event->guests], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create event with guests', 'message' => $e->getMessage()], 500);
        }
    }
    public function getGuests()
    {
        $guests = Guest::all();
        return response()->json($guests);
    }
    public function getGuestByEvent($eventid)
    {
       try {
        $guests = Guest::where('event_id', $eventid)->get();
        return response()->json($guests);
        // return Guest::where('event_id', $eventid)->get();
       } catch (\Throwable $th) {
        //throw $th;
        return response()->json(['message' => $th->getMessage()], 500);
       }

    }
}