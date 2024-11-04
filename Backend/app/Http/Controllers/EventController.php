<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage; // Import Storage facade
use App\Rules\TimeRule; 

class EventController extends Controller
{
    public function index()
    {
        // Retrieve all events from the database
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
}
