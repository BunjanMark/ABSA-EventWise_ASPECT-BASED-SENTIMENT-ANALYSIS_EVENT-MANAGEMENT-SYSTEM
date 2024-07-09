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
            return response(["message" => $th->getMessage()], 500);

        }
    }

    public function accountRecovery(Request $request){
        
    }

   
}
