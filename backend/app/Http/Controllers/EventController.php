<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index()
    {
        // Retrieve all events from the database
        $events = Event::all();

        // Return the events as a JSON response
        return response()->json($events);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'pax' => 'required|integer',
            'invitation_message' => 'required|string',
            'people_to_invite' => 'required|string',
            'venue' => 'required|string',
            'package_type' => 'required|string',
            'providers' => 'array'
        ]);

        // Create a new event
        $event = Event::create($validatedData);

        // Return a response
        return response()->json(['message' => 'Event created successfully', 'event' => $event], 201);
    }
}
