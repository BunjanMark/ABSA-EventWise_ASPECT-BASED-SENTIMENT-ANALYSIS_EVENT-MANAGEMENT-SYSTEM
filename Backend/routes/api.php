<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

 


Route::post('customlogin', [AuthenticatedSessionController::class, 'customLogin']);

Route::post('/login', function(Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:8',
        // 'device_name' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();
    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect.'],
        ]);
    } 

    return response()->json([
        'token' => $user->createToken('authToken')->plainTextToken,
        'user' => $user,
        'message' => 'Login Successful'
    ]);
});


// Route::middleware(['admin'])->get('/admin', [AdminController::class, 'index']);
// test route

 