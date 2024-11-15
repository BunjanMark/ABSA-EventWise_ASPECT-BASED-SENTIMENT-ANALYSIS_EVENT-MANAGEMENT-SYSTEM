<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guests;
use App\Models\Event;  // Ensure the Event model is included
use Illuminate\Support\Facades\DB;

class GuestsController extends Controller
{
    // Fetch all guests
    public function index()
    {
        $guests = Guests::all();  // Get all guests
        return response()->json($guests, 200);  // Return guests data with 200 OK status
    }

public function getGuestByEvent($eventid)
{
    try {
        // Fetch guests for a specific event
        $guests = Guests::where('event_id', $eventid)->get();
        
        // Log the guests data (this will print to the Laravel log file)
        \Log::info('Guests Data:', $guests->toArray());

        return response()->json($guests, 200);  // Return guests data with 200 OK status
    } catch (\Throwable $th) {
        return response()->json(['message' => 'Error fetching guests: ' . $th->getMessage()], 500);
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

        $guest = new Guests();  // Instantiate a new Guest
        $guest->name = $request->name;
        $guest->email = $request->email;
        $guest->phone = $request->phone;
        $guest->role = $request->role;
        $guest->event_id = $request->event_id;
        $guest->save();

        return response()->json($guest, 201);  // Return the saved guest with 201 Created status
    }

    // Edit an existing guest
    public function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:15',
            'role' => 'nullable|string|max:50',
        ]);

        // Find the guest by ID
        $guest = Guests::find($id);

        if (!$guest) {
            return response()->json(['message' => 'Guest not found'], 404);
        }

        // Update the guest's information
        $guest->name = $request->name;
        $guest->email = $request->email;
        $guest->phone = $request->phone;
        $guest->role = $request->role;
        $guest->save();

        return response()->json($guest, 200);  // Return the updated guest
    }

    // Delete a guest
    public function destroy($id)
    {
        // Find the guest by ID
        $guest = Guests::find($id);

        if (!$guest) {
            return response()->json(['message' => 'Guest not found'], 404);
        }

        // Delete the guest
        $guest->delete();

        return response()->json(['message' => 'Guest deleted successfully'], 200);
    }

    // Get all guests
    public function getGuests()
    {
        $guests = Guests::all();  // Fetch all guests
        return response()->json($guests, 200);  // Return guests data with 200 OK status
    }
}
