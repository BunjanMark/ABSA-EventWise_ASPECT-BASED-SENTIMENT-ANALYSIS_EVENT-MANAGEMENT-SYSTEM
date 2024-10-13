<?php

namespace App\Http\Controllers;

use App\Models\PendingUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PendingUserController extends Controller
{


    public function index()
{
    try {
        // Fetch all pending users
        $pendingUsers = PendingUser::all();

        // Return a JSON response
        return response()->json($pendingUsers);
    } catch (\Exception $e) {
        // Log the error for debugging
        \Log::error('Error fetching pending users: ' . $e->getMessage());

        // Return a 500 Internal Server Error response
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}



    public function register(Request $request)
    {
        \Log::info($request->all());
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:pending_users',
            'email' => 'required|string|email|max:255|unique:pending_users',
            'password' => 'required|string|min:8|confirmed', // Ensure password confirmation
            'phone_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:Male,Female,Other',
            'terms_accepted' => 'required|boolean',
            'role' => 'required|integer|in:2,3', // Accept integers for role
        ]);
    
        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        // Map integer role to string
        $roleMapping = [
            2 => 'customer',
            3 => 'service provider',
        ];
    
        $roleString = $roleMapping[$request->role]; // Get corresponding string value for role
    
        // Create a pending user
        $pendingUser = PendingUser::create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password, // Hashing handled in the model
            'phone_number' => $request->phone_number,
            'date_of_birth' => $request->date_of_birth,
            'gender' => $request->gender,
            'terms_accepted' => $request->terms_accepted,
            'role' => $roleString, // Use the mapped string for role
        ]);
    
        return response()->json([
            'message' => 'Registration successful', 
            'user' => $pendingUser
        ], 201);
    }
    

}
