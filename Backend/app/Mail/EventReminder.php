<?php

namespace App\Mail;

use App\Models\Event;
use App\Models\Guest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EventReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $event;
    public $guests;

    /**
     * Create a new message instance.
     *
     * @param Event $event
     * @param \Illuminate\Database\Eloquent\Collection $guests
     * @return void
     */
    public function __construct(Event $event, $guests)
    {
        $this->event = $event;
        $this->guests = $guests;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.event_reminder')
                    ->subject("Reminder: Upcoming Event - {$this->event->name}")
                    ->with([
                        'eventName' => $this->event->name,
                        'eventDate' => $this->event->event_date,
                        'eventLocation' => $this->event->location,
                        'guests' => $this->guests,
                    ]);
    }
}
