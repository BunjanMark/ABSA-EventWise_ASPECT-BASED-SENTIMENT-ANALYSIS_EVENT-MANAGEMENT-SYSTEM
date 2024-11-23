<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use App\Events\SendExpoTokenEvent;
use App\Listeners\SaveExpoTokenListener;
use App\Events\ServiceCreatedEvent;
use App\Listeners\NotifyAdminListener;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
 
        //   if (env(key: 'APP_ENV') === 'local' && request()->server(key: 'HTTP_X_FORWARDED_PROTO') === 'https') {
        //     URL::forceScheme(scheme: 'https');
        // }

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
       Event::listen(
         SendExpoTokenEvent::class,
         SaveExpoTokenListener::class,
         ServiceCreatedEvent::class,
         NotifyAdminListener::class,
       );

       
    }
     
}
