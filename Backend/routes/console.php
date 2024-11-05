<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use App\Console\Commands\RefreshDatabaseAndSeed;
use App\Console\Commands\ExampleCommand;
use App\Console\Commands\ServeProject;
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();
// Schedule::command('app:test-job')->everyMinute();
// RefreshDatabaseAndSeed::command('db:refresh-seed');
Artisan::command('db:refresh-seed', function(){
    $this->call(RefreshDatabaseAndSeed::class);
    $this->info('Database and seed refreshed');
})->purpose('Refresh database and seed');
Artisan::command("exampleCommand {name}", function ($name) {
    // Pass the 'name' argument as an array when calling ExampleCommand
    $this->call(ExampleCommand::class, ['name' => $name]);
    $this->info('Example command executed successfully');
})->purpose('Example command');
Artisan::command('serve-project {host?} {port?}', function ($host = 'localhost', $port = '8000') {
    // Call ServeProject with host and port parameters
    $this->call(ServeProject::class, ['host' => $host, 'port' => $port]);
})->purpose('Serve project at specified host and port');
 