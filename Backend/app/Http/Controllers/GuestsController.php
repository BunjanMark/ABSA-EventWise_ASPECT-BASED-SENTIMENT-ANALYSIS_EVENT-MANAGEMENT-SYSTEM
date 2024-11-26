<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guests;
use App\Models\Event;  // Ensure the Event model is included
use Illuminate\Support\Facades\DB;

class GuestsController extends Controller
{
    // Fetch all guests for a specific event
    public function getGuestByEvent($eventid)
    {
        try {
            // Fetch guests for a specific event
            $guests = Guests::where('event_id', $eventid)->get();
            
            // If no guests are found, return a 404 response
            if ($guests->isEmpty()) {
                return response()->json(['message' => 'No guests found for this event'], 404);
            }

            return response()->json($guests, 200);  // Return guests data with 200 OK status
        } catch (\Throwable $th) {
            // Log the error
            \Log::error('Error fetching guests for event: ' . $th->getMessage());
            return response()->json(['message' => 'Error fetching guests: ' . $th->getMessage()], 500);
        }
    }

    // Store a new guest
    public function store(Request $request)
    {
        $request->validate([
            'GuestName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'role' => 'required|string|max:15',
            'event_id' => 'required|exists:events,id',  // Ensure event exists before saving
        ]);

        $guest = new Guests();  // Instantiate a new Guest
        $guest->GuestName = $request->GuestName;
        $guest->email = $request->email;
        $guest->phone = $request->phone;
        $guest->role = $request->role;
        $guest->event_id = $request->event_id;
        $guest->save();

        return response()->json($guest, 201);  // Return the saved guest with 201 Created status
    }

    // Edit an existing guest
   // Inside GuestsController

   public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'GuestName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'role' => 'required|string|max:15',
        ]);

        // Find the guest by ID
        $guest = Guests::find($id);

        if (!$guest) {
            return response()->json(['message' => 'Guest not found'], 404);
        }

        // Update the guest's information
        $guest->GuestName = $request->GuestName;
        $guest->email = $request->email;
        $guest->phone = $request->phone;
        $guest->role = $request->role;
        $guest->save();

        return response()->json($guest, 200);  // Return the updated guest
    }

   


    // Delete a guest
    public function destroy($id)
    {
        $guest = Guests::find($id);

        if (!$guest) {
            return response()->json(['message' => 'Guest not found'], 404);
        }

        $guest->delete();

        return response()->json(['message' => 'Guest deleted successfully'], 200);
    }
}
