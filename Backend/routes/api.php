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
use App\Http\Controllers\AccountManagementController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

 

// user Management authentication
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthenticatedSessionController::class, 'loginAccount']);
    Route::post('signup', [AuthenticatedSessionController::class, 'signupAccount']);
    // Route::post('/signup', [AuthenticatedSessionController::class, 'signupAccount']);
    Route::patch('update', [AuthenticatedSessionController::class, 'accountUpdate'])->middleware(['auth:sanctum']);
    Route::get('/me', [AuthenticatedSessionController::class, 'show'])->middleware(['auth:sanctum']);

    Route::post('switch-account', [AuthenticatedSessionController::class, 'switchAccount'])->middleware(['auth:sanctum']);
});

//for switch account profile admin
Route::post('/admin/account-management', [AccountManagementController::class, 'addProfile'])->middleware(['auth:sanctum']);
Route::get('/admin/account-management', [AccountManagementController::class, 'getProfile'])->middleware(['auth:sanctum']);
Route::get('/admin/account-management/{user}', [AccountManagementController::class, 'edit']);
Route::patch('/admin/account-management/{user}', [AccountManagementController::class, 'update']);
Route::delete('/admin/account-management/{user}', [AccountManagementController::class, 'destroy']);

Route::get('/account-management', [AccountManagementController::class, 'getProfile'])->middleware(['auth:sanctum']);



// Route::middleware(['admin'])->get('/admin', [AdminController::class, 'index']);
// test route respond hello world
Route::get('/hello', function () {
//     echo(url('/login'));
//  echo(route('login'));
return response()->json(['status' => 200, 'message' => 'Hello World!']);
// return response()->json(compact('token'))->header("Access-Control-Allow-Origin",  "*");
});


// Protected Routes for admin
// sample
// Route::controller(ProfileController::class)->middleware(['auth','admin'])->group(function() {

//     Route::get('/admin/categories/index', 'index')->name('admin.category.index');
//     Route::get('/admin/categories/create','create')->name('admin.category.create');
//     Route::POST('/admin/categories/index','store')->name('admin.category.store');
//     Route::get('/admin/categories/edit/{category}', 'edit')->name('admin.category.edit');
//     Route::PUT('/admin/categories/update/{category}','update')->name('admin.category.update');
//     Route::DELETE('/admin/categories/delete/{category}', 'delete')->name('admin.category.delete');
    
//   });
