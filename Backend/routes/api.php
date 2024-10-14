<?php

use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PendingUserController;


Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/api/events/{date}', [EventController::class, 'eventsForDay']);



Route::get('equipment', [EquipmentController::class, 'index']);
Route::post('equipment', [EquipmentController::class, 'store']);
Route::put('equipment/{id}', [EquipmentController::class, 'update']);
Route::delete('equipment/{id}', [EquipmentController::class, 'destroy']);


Route::get('pending', [PendingUserController::class, 'index']);
Route::post('/pending', [PendingUserController::class, 'register']);

