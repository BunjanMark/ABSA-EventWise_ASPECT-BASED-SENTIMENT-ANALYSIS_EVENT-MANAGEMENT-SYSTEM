<?php 

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    public function customLogin(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to log the user in
        if (Auth::attempt($validated)) {
            $user = Auth::user();

            // Generate a token for the user (if using Laravel Sanctum or Passport)
            $token = $user->createToken('authToken')->plainTextToken;

            // Check the user role and return appropriate response
            if ($user->role_id == 0) {
                return response()->json(['message' => 'Dashboard', 'token' => $token, 'user' => $user], 200);
            } elseif ($user->role_id == 1) {
                return response()->json(['message' => 'Admin Dashboard', 'token' => $token, 'user' => $user], 200);
            } elseif ($user->role_id == 2) {
                return response()->json(['message' => 'Super Admin Dashboard', 'token' => $token, 'user' => $user], 200);
            }
        } else {
            return response()->json(['message' => 'Wrong credentials'], 401);
        }
    }
}
