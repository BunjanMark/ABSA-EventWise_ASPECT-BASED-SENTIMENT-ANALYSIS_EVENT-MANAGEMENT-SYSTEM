@extends('layouts.app') 

@section('content')
<div class="container">
    <div id="services">
        <!-- The services will be dynamically loaded here -->
    </div>
    <h1>Feedback for Event: {{ $event->name ?? 'Unknown Event' }}</h1>

    <form id="feedbackForm">
        @csrf
        <input type="hidden" name="event_id" value="{{ $eventId }}">
        <input type="hidden" name="customer_id" value="">
        <input type="hidden" name="customer_name" value="">
    
        <!-- Feedback for dynamically included categories -->
        @if (in_array('Catering', $services))
            <div class="form-group">
                <label for="catering_feedback">Catering Feedback</label>
                <textarea name="catering_feedback" id="catering_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Food Catering', $services))
            <div class="form-group">
                <label for="food_catering_feedback">Food Catering Feedback</label>
                <textarea name="food_catering_feedback" id="food_catering_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
    
        @if (in_array('Decoration', $services))
            <div class="form-group">
                <label for="decoration_feedback">Decoration Feedback</label>
                <textarea name="decoration_feedback" id="decoration_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
    
        @if (in_array('Photography', $services))
            <div class="form-group">
                <label for="photography_feedback">Photography Feedback</label>
                <textarea name="photography_feedback" id="photography_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
    
        @if (in_array('Videography', $services))
            <div class="form-group">
                <label for="videography_feedback">Videography Feedback</label>
                <textarea name="videography_feedback" id="videography_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Host', $services))
            <div class="form-group">
                <label for="host_feedback">Videography Feedback</label>
                <textarea name="host_feedback" id="host_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Entertainment', $services))
            <div class="form-group">
                <label for="entertainment_feedback">Videography Feedback</label>
                <textarea name="entertainment_feedback" id="entertainment_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Sound', $services))
            <div class="form-group">
                <label for="sound_feedback">Videography Feedback</label>
                <textarea name="sound_feedback" id="sound_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Marketing', $services))
            <div class="form-group">
                <label for="marketing_feedback">Videography Feedback</label>
                <textarea name="marketing_feedback" id="marketing_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Trasportation', $services))
            <div class="form-group">
                <label for="transportation_feedback">Videography Feedback</label>
                <textarea name="transportation_feedback" id="transportation_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Accomodation', $services))
            <div class="form-group">
                <label for="accommodation_feedback">Videography Feedback</label>
                <textarea name="accommodation_feedback" id="accommodation_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Venue', $services))
            <div class="form-group">
                <label for="venue_feedback">Videography Feedback</label>
                <textarea name="venue_feedback" id="venue_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Lighting', $services))
            <div class="form-group">
                <label for="lighting_feedback">Videography Feedback</label>
                <textarea name="lighting_feedback" id="lighting_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Venue Management', $services))
            <div class="form-group">
                <label for="venue_management_feedback">Videography Feedback</label>
                <textarea name="venue_management_feedback" id="venue_management_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
        @if (in_array('Other', $services))
            <div class="form-group">
                <label for="other_feedback">Videography Feedback</label>
                <textarea name="other_feedback" id="other_feedback" class="form-control" rows="3"></textarea>
            </div>
        @endif
    
        <button type="button" id="submitFeedback" class="btn btn-primary">Submit Feedback</button>
    </form>
    
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = 4;  // Replace with dynamic logic
    const guestId = 1;  // Replace with dynamic logic
    const guestName = "John Doe";  // Replace with dynamic logic

    console.log("Event ID:", eventId);
    console.log("Guest ID:", guestId);
    console.log("Guest Name:", guestName);


    // Set dynamic values in the form
    document.querySelector('input[name="event_id"]').value = eventId;
    document.querySelector('input[name="customer_id"]').value = guestId;
    document.querySelector('input[name="customer_name"]').value = guestName;

    document.getElementById("submitFeedback").addEventListener("click", function() {
        const feedbackData = {
            venue_feedback: document.getElementById("venue_feedback")?.value || '',
            catering_feedback: document.getElementById("catering_feedback")?.value || '',
            decoration_feedback: document.getElementById("decoration_feedback")?.value || '',
            food_catering_feedback: document.getElementById("food_catering_feedback")?.value || '',
            accommodation_feedback: document.getElementById("accommodation_feedback")?.value || '',
            transportation_feedback: document.getElementById("transportation_feedback")?.value || '',
            photography_feedback: document.getElementById("photography_feedback")?.value || '',
            videography_feedback: document.getElementById("videography_feedback")?.value || '',
            host_feedback: document.getElementById("host_feedback")?.value || '',
            entertainment_feedback: document.getElementById("entertainment_feedback")?.value || '',
            sound_feedback: document.getElementById("sound_feedback")?.value || '',
            lighting_feedback: document.getElementById("lighting_feedback")?.value || '',
            venue_management_feedback: document.getElementById("venue_management_feedback")?.value || '',
            marketing_feedback: document.getElementById("marketing_feedback")?.value || '',
            other_feedback: document.getElementById("other_feedback")?.value || '',
            event_id: eventId,
            customer_name: guestName,
            customer_id: guestId,
        };
        console.log("Feedback Data:", feedbackData);

        // Submit the feedback data to the server #TODO should be dynamic
        fetch("https://1e1f-49-149-106-143.ngrok-free.app/submit_feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log("Success:", data);
            alert("Feedback submitted successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to submit feedback.");
        });
    });
});
</script>
@endsection
