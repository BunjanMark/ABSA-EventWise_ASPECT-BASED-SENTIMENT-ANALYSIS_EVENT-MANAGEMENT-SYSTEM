<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Event; // Assuming you have an Event model
use Illuminate\Support\Facades\Mail;
use App\Mail\EventReminder;
class SendEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
   
    protected $signature = 'email:send-event-reminders';
    protected $description = 'Send email reminders for upcoming events';

    /**
     * The console command description.
     *
     * @var string
     */
    public function handle()
    {
        // Fetch events happening tomorrow
        $tomorrow = now()->addDay()->toDateString();
        $events = Event::whereDate('date', $tomorrow)->get();

        foreach ($events as $event) {
            // Get all guests associated with this event
            $guests = $event->guests; // Using the relationship from Event to Guest
            // $guests = $event->guests()->where('role', 'attendee')->get();

            foreach ($guests as $guest) {
                Mail::to($guest->email)->send(new EventReminder($event));
                $this->info("Reminder sent to {$guest->email} for event: {$event->name}");
            }
        }
    }

    /**
     * Execute the console command.
     */
 
}
