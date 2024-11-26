<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guest;
use App\Models\Event;  // Ensure the Event model is included
use Illuminate\Support\Facades\DB;

class GuestController extends Controller
{
    
    // Fetch all guest for a specific event
    public function getGuestByEvent($eventid)
    {
        try {
            // Fetch guest for a specific event
            $guest = Guest::where('event_id', $eventid)->get();
            
            // If no guest are found, return a 404 response
            if ($guest->isEmpty()) {
                return response()->json(['message' => 'No guest found for this event'], 404);
            }

            return response()->json($guest, 200);  // Return guest data with 200 OK status
        } catch (\Throwable $th) {
            // Log the error
            \Log::error('Error fetching guest for event: ' . $th->getMessage());
            return response()->json(['message' => 'Error fetching guest: ' . $th->getMessage()], 500);
        }
    }

    // Store a new guest
    public function store(Request $request)
    {
        $request->validate([
            'GuestName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'event_id' => 'required|exists:events,id',  // Ensure event exists before saving
            'role' => 'required|string|max:255',  // Ensure event exists before saving
        ]);

        $guest = new Guest();  // Instantiate a new Guest
        $guest->GuestName = $request->GuestName;
        $guest->email = $request->email;
        $guest->phone = $request->phone;
        $guest->event_id = $request->event_id;
        $guest->role = $request->role;
        $guest->save();

        return response()->json($guest, 201);  // Return the saved guest with 201 Created status
    }

    // Edit an existing guest
   // Inside GuestController

   public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'GuestName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'role' => 'required|string',    
        ]);

        // Find the guest by ID
        $guest = Guest::find($id);

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
        $guest = Guest::find($id);

        if (!$guest) {
            return response()->json(['message' => 'Guest not found'], 404);
        }

        $guest->delete();

        return response()->json(['message' => 'Guest deleted successfully'], 200);
    }
}
