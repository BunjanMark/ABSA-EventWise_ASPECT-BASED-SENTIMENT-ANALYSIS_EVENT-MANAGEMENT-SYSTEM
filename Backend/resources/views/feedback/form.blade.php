@extends('layouts.app')

@section('content')
<div class="container">
    <div id="services">
        <!-- The services will be dynamically loaded here -->
    </div>
    <h1>Feedback for Event: {{ $event->name ?? 'Unknown Event' }}</h1>

    <form id="feedbackForm">
        @csrf  <!-- CSRF token is needed for Laravel, although we're not using form submission here -->
        
        <input type="hidden" name="event_id" value="">
        <input type="hidden" name="customer_id" value="">
        <input type="hidden" name="customer_name" value="">
    
        <div class="form-group">
            <label for="event_feedback">Event Feedback</label>
            <textarea name="event_feedback" id="event_feedback" class="form-control" rows="3"></textarea>
        </div>
    
        <div class="form-group">
            <label for="venue_feedback">Venue Feedback</label>
            <textarea name="venue_feedback" id="venue_feedback" class="form-control" rows="3"></textarea>
        </div>
    
        <button type="button" id="submitFeedback" class="btn btn-primary">Submit Feedback</button>
    </form>
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const eventId = 4;  // Replace with dynamic logic
    const guestId = 8;  // Replace with dynamic logic
    const guestName = "John Doe";  // Replace with dynamic logic

    // Set dynamic values in the form
    document.querySelector('input[name="event_id"]').value = eventId;
    document.querySelector('input[name="customer_id"]').value = guestId;
    document.querySelector('input[name="customer_name"]').value = guestName;

    document.getElementById("submitFeedback").addEventListener("click", function() {
        const feedbackData = {
            event_feedback: document.getElementById("event_feedback").value,
            venue_feedback: document.getElementById("venue_feedback").value,
            event_id: eventId,
            customer_id: guestId,
            customer_name: guestName
        };

        fetch("http://192.168.1.13:5000/submit_feedback", {
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
