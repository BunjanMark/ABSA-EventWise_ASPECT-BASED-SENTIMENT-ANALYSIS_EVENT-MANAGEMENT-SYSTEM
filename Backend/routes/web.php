<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FeedbackController;
// Route::get('/feedback', [FeedbackController::class, 'showForm']);

// Route::post('/feedback/submit', [FeedbackController::class, 'submitFeedback'])->name('feedback.submit');

// Route to show the feedback form
Route::get('/feedback/form', [FeedbackController::class, 'showForm'])->name('feedback.form');

// Route to handle the feedback submission
Route::post('/feedback/submit', [FeedbackController::class, 'submitFeedback'])->name('feedback.submit');


Route::get('/', function () {
    return view('welcome');
});
