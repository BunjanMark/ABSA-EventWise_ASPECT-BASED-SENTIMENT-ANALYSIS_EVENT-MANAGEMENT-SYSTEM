<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Models\Event;
use App\Models\Guest;
use App\Jobs\FetchEventServicesJob;
use Illuminate\Support\Facades\Cache;

class FeedbackController extends Controller
{
    /**
     * Submit feedback to the Flask API.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */


     public function showForm(Request $request)
     {
         $eventId = $request->query('event_id');
         $guestId = $request->query('guest_id');
     
         $event = Event::find($eventId); // Get the event from the database
     
         $services = Cache::remember("event_services_{$eventId}", 60, function() use ($eventId) {
             return DB::table('services')
                 ->join('event_services_providers', 'services.id', '=', 'event_services_providers.service_id')
                 ->where('event_services_providers.event_id', $eventId)
                 ->get();
         });
     
         // Pass eventId, guestId, event, and services to the view
         return view('feedback.form', compact('eventId', 'guestId', 'event', 'services'));
     }

    public function submitFeedback(Request $request)
{
    $validatedData = $request->validate([
        'event_feedback' => 'nullable|string',
        'venue_feedback' => 'nullable|string',
        'event_id' => 'required|integer|exists:events,id',
        'guest_id' => 'required|integer|exists:guest,id',
    ]);

    // Handle the feedback data, e.g., save it in the database or send it to the Flask API
    // For this example, just log the feedback for now
    \Log::info('Feedback received:', $validatedData);

    return redirect()->route('feedback.form')->with('message', 'Thank you for your feedback!');
}
public function submitFeedbackAllAspect(Request $request)
{
    try {
        $validatedData = $request->validate([
            'event_feedback' => 'nullable|string',
            'venue_feedback' => 'nullable|string',
            'event_id' => 'required|integer',
            'customer_name' => 'required|string',
            'customer_id' => 'required|integer',
        ]);
    } catch (\Illuminate\Validation\ValidationException $e) {
        \Log::error('Validation Error:', $e->errors());
        return back()->withErrors($e->errors())->withInput();
    }

    // Process the feedback data directly
    \Log::info('Event Feedback:', ['Feedback' => $validatedData['event_feedback']]);
    \Log::info('Venue Feedback:', ['Feedback' => $validatedData['venue_feedback']]);

    return back()->with('success', 'Feedback submitted successfully.');
}

}
