<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Illuminate\Http\Request;
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
    // public function boot(): void
    // {
        
    //     //
    //     // if (request()->server->has('HTTP_X_ORIGINAL_HOST')) {
    //     //     url()->forceRootUrl(
    //     //         request()->server->get('HTTP_X_FORWARDED_PROTO').'://'.request()->server->get('HTTP_X_ORIGINAL_HOST')
    //     //     );
    //     // }
    //     // if ($request->server->has('HTTP_X_ORIGINAL_HOST')) {
    //     //     $request->server->set('HTTP_X_FORWARDED_HOST', $request->server->get('HTTP_X_ORIGINAL_HOST'));
    //     //     $request->headers->set('X_FORWARDED_HOST', $request->server->get('HTTP_X_ORIGINAL_HOST'));
    //     // }

    //     // force method
        
    //     // if ($request->server->has('HTTP_X_ORIGINAL_HOST')) {
    //     //     $this->app['url']->forceRootUrl($request->server->get('HTTP_X_FORWARDED_PROTO').'://'.$request->server->get('HTTP_X_ORIGINAL_HOST'));
    //     // }

    //     // involves parameters ( \Illuminate\Http\Request $request)
    //     // if (!empty( env('NGROK_URL') ) && $request->server->has('HTTP_X_ORIGINAL_HOST')) {
    //     //     $this->app['url']->forceRootUrl(env('NGROK_URL'));
    //     // }
    // }
    public function boot()
    {
        if (env('APP_ENV') !== 'local') {
            URL::forceScheme('https');
        }
        // if ($request->server->has('HTTP_X_ORIGINAL_HOST')) {
        //     $request->server->set('HTTP_X_FORWARDED_HOST', $request->server->get('HTTP_X_ORIGINAL_HOST'));
        //     $request->headers->set('X_FORWARDED_HOST', $request->server->get('HTTP_X_ORIGINAL_HOST'));
        // }
        // if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1) || isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&  $_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https') {
        //     $this->app['request']->server->set('HTTPS', true);
        // }
        // \Illuminate\Support\Facades\URL::forceScheme('https');

    }
}
