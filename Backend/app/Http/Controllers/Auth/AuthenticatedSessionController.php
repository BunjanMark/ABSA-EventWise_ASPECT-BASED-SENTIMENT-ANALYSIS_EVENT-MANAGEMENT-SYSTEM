<?php 

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserStoreRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;
use Illuminate\Support\Str;
 

class AuthenticatedSessionController extends Controller
{   
    public function __construct(){
        $this->model = new User();
    }
    public function loginAccount(LoginRequest $request)
    {

        try {
            $user = User::where('email', $request->email)->first();
            
            $user1 = $request->user();
            if(!$user || !Hash::check($request->password, $user->password)){
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

          
            return response()->json([
                'message' => 'Login Successful',
                'user' => $user,
                'role' => $user->role_id,
                'token' => $user->createToken('authToken')->plainTextToken
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
    public function logout(Request $request)
{
    if (!Auth::check()) {
        return response()->json(['message' => 'You are not logged in'], 401);
    }

    try {
        $request->user()->tokens()->delete();
        Auth::logout();
        return response()->json(['message' => 'Logged out successfully']);
    } catch (\Throwable $th) {
        return response()->json(['message' => $th->getMessage()], 500);
    }
}
    // public function logout(Request $request)
    // {
    //     try {
    //         $request->user()->tokens()->delete();
    //         Auth::logout();
    //         return response()->json(['message' => 'Logged out successfully']);
    //     } catch (\Throwable $th) {
    //         return response()->json(['message' => $th->getMessage()], 500);
    //     }
    // }
    public function show(Request $request){
        return response()->json($request->user(), 200);
    }
    // When testing api - be sure to include auth in the header and pass the token generated after login
    public function accountUpdate(UpdateUserRequest $request, User $user)
    {   
        \Log::info('Authenticated User:', ['id' => $request->user()->id]);
        \Log::info('Target User:', ['id' => $user->id]);
        

        
        try {
            $userDetails = $user->find($request->user()->id);

            if (! $userDetails) {
                return response(["message" => "User not found"], 404);
            }

            $userDetails->update($request->validated());

            return response([
            "message" => "User Successfully Updated",
            "user" => $userDetails], 200);
        } catch (\Throwable $th) {
            return response(["message" => $th->getMessage()], 400);
        }
    }

    public function signupAccount(UserStoreRequest $request){
        try {
            $createUser = $this->model->create($request->all());
            if (!$createUser) {
                return response(["message" => "User not created"], 500);
            }
            return response(["message" => "User Successfully Created"], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response(["status" => "error","message" => $th->getMessage()], 500);
        }
    }

    public function accountRecovery(Request $request){
        
    }

    public function fetchNotifications()
    {
        $notifications = auth()->user()->notifications;  // Get all notifications for the authenticated user
        return response()->json($notifications);
    }
    // Send email verification code
    public function sendVerificationEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
    
        // Generate a random 6-digit verification code
        $verificationCode = mt_rand(100000, 999999);

    
        // Store the code in the session
        session(['verification_code_' . $request->email => $verificationCode]);
    
        // Send the verification email with the code
        Mail::to($request->email)->send(new EmailVerification($verificationCode));
    
        return response()->json(['message' => 'Verification code sent to email.']);
    }
    

    // Verify the code entered by the user
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|size:6',
        ]);
    
        // Retrieve the code from the session
        $storedCode = session('verification_code_' . $request->email);
    
        if ($storedCode && $storedCode === $request->code) {
            // Code is correct; proceed with verification actions
            session()->forget('verification_code_' . $request->email); // Clear the session entry
    
            return response()->json(['success' => true, 'message' => 'Email verified successfully.']);
        }
    
        return response()->json(['success' => false, 'message' => 'Invalid verification code.'], 400);
    }
    



// // Send email verification code
//     public function sendVerificationEmail(Request $request)
//     {
//         $request->validate([
//             'email' => 'required|email|exists:users,email',
//         ]);

//         // $user = User::where('email', $request->email)->first();

//         // Generate a random 6-digit verification code
//         $verificationCode = Str::random(6);

//         // Store the code temporarily in the user's record
//         $user->update(['verification_code' => $verificationCode]);

//         // Send the verification email with the code
//         Mail::to($user->email)->send(new EmailVerification($verificationCode));

//         return response()->json(['message' => 'Verification code sent to email.']);
//     }

//     // Verify the code entered by the user
//     public function verifyCode(Request $request)
//     {
//         $request->validate([
//             'email' => 'required|email|exists:users,email',
//             'code' => 'required|size:6',
//         ]);

//         // $user = User::where('email', $request->email)->first();

//         if ($user->verification_code === $request->code) {
//             // Mark email as verified and clear the verification code
//             $user->update(['email_verified_at' => now(), 'verification_code' => null]);

//             return response()->json(['success' => true, 'message' => 'Email verified successfully.']);
//         }

//         return response()->json(['success' => false, 'message' => 'Invalid verification code.'], 400);
//     }
    
}
