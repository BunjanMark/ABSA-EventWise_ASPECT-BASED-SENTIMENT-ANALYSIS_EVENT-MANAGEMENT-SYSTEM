<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
use App\Events\SendExpoTokenEvent;
use App\Listeners\SaveExpoTokenListener;
 

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
         SaveExpoTokenListener::class
       );
    }
    // public function boot()
    // {
    //     if (env('APP_ENV') !== 'local') {
    //         URL::forceScheme('https');
    //     }
    //     // if ($request->server->has('HTTP_X_ORIGINAL_HOST')) {
    //     //     $request->server->set('HTTP_X_FORWARDED_HOST', $request->server->get('HTTP_X_ORIGINAL_HOST'));
    //     //     $request->headers->set('X_FORWARDED_HOST', $request->server->get('HTTP_X_ORIGINAL_HOST'));
    //     // }
    //     // if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&  $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
    //     //     $this->app['request']->server->set('HTTPS', true);
    //     // }
    //     // \Illuminate\Support\Facades\URL::forceScheme('https');

    // }
}
