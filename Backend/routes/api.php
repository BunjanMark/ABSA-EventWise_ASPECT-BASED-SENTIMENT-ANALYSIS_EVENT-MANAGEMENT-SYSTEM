<?php

use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PendingUserController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\AccountManagementController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\GuestsController;
use App\Http\Controllers\AccountRoleController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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
// for email verification
Route::post('/verify-email', [AuthenticatedSessionController::class, 'sendVerificationEmail']);
Route::post('/verify-email-code', [AuthenticatedSessionController::class, 'verifyCode']);
// test email view
// Route::get('/test-email-view', function () {
//     return view('emails.verification', ['verificationCode' => '123456']);
// });
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

// Admin Package Management
Route::post('/admin/packages', [PackageController::class, 'store']);
Route::get('/admin/packages', [PackageController::class, 'index']);

// Admin Event Management
// Route::middleware('auth:sanctum')->post('/admin/events', [EventController::class, 'store']);
Route::post('/admin/events', [EventController::class, 'store']);
Route::get('/admin/events', [EventController::class, 'index']);
Route::get('/admin/events/{id}', [EventController::class, 'showEventById']);
Route::patch('/admin/events/{event}', [EventController::class, 'updateEvent']);
Route::get('/events/active', [EventController::class, 'getActiveEvents']);
Route::get('/events/archived', [EventController::class, 'getArchivedEvents']);
Route::post('/events/{id}/archive', [EventController::class, 'archiveEvent']);

// Guest management 
Route::get('/guests', [GuestsController::class, 'index']);
Route::get('/guests/{eventid}', [GuestsController::class, 'getGuestByEvent']);

// service management
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/services', [ServiceController::class, 'index']);         // Get all services for the authenticated user
    Route::post('/services', [ServiceController::class, 'store']);       // Create a new service
    Route::get('/services/{id}', [ServiceController::class, 'show']);    // Get a specific service
    Route::put('/services/{id}', [ServiceController::class, 'update']);   // Update a specific service
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']); // Delete a specific service
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

Route::get('/events', [EventController::class, 'index']);
Route::post('/events', [EventController::class, 'store']);
Route::get('/api/events/{date}', [EventController::class, 'eventsForDay']);
Route::get('equipment', [EquipmentController::class, 'index']);
Route::post('equipment', [EquipmentController::class, 'store']);
Route::put('equipment/{id}', [EquipmentController::class, 'update']);
Route::delete('equipment/{id}', [EquipmentController::class, 'destroy']);


Route::get('pending', [PendingUserController::class, 'index']);
Route::post('/pending', [PendingUserController::class, 'register']);

Route::post('/accept-pending-user/{id}', [UserController::class, 'acceptPendingUser']);
Route::delete('/decline-pending-user/{id}', [UserController::class, 'declinePendingUser']);

Route::post('/login', [UserController::class, 'login']);