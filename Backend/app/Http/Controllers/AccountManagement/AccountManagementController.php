<?php

namespace App\Http\Controllers\AccountManagement;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
class AccountManagementController extends Controller
{
    //
    public function __construct(){
        $this->model = new User();

    }
    public function accountUpdate(UpdateUserRequest $request, User $user){
        try{
            $userDetails = $user->find($request->user()->user_id);
            if(!$userDetails){
                return response(["message" => "User not found"], 404);
            }
            $userDetails->update($request->validated());
            return response(["message" => "User Successfully Updated"], 200);
        }catch (\Throwable $th) {
            return response(["message" => $th->getMessage()], 400);
        }
    }
    // public function accountUpdate(UpdateUserRequest $request, User $user)
    // {
    //     try {
    //         $userDetails = $user->find($request->user()->user_id);

    //         if (! $userDetails) {
    //             return response(["message" => "User not found"], 404);
    //         }

    //         $userDetails->update($request->validated());

    //         return response(["message" => "User Successfully Updated"], 200);
    //     } catch (\Throwable $th) {
    //         return response(["message" => $th->getMessage()], 400);
    //     }
    // }
}
