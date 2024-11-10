<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Guests;  // Ensure that this is plural if the model is named 'Guests'
use Illuminate\Support\Facades\DB;

class GuestsController extends Controller
{
    // Fetch all events with guests
    public function index()
    {
        $events = Event::with('guests')->get();  // Eager loading guests with events
        return response()->json($events, 200);
    }

    // Fetch guests for a specific event
    public function getGuestByEvent($eventid)
    {
        try {
            $guests = Guests::where('event_id', $eventid)->get();  // Use the correct model name here
            return response()->json($guests, 200);  // Return a 200 response along with guests data
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Error fetching guests: ' . $th->getMessage()], 500);  // Enhanced error message
        }
    }

    // Store a new guest
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'role' => 'nullable|string|max:50',
            'event_id' => 'required|exists:events,id',  // Ensure event exists before saving
        ]);

        $guest = new Guests();  // Use the plural model name if that's the convention
        $guest->name = $request->name;
        $guest->email = $request->email;
        $guest->phone = $request->phone;
        $guest->role = $request->role;
        $guest->event_id = $request->event_id;
        $guest->save();

        return response()->json($guest, 201);  // Return the saved guest with a 201 response code
    }

    // Get all guests
    public function getGuests()
    {
        $guests = Guests::all();  // Fetch all guests
        return response()->json($guests, 200);  // Return guests data with a 200 status code
    }
}
