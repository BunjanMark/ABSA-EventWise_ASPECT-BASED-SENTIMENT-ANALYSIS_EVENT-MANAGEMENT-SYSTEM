<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use App\Models\AccountRole; // Add this import
use Illuminate\Validation\ValidationException;

class ServiceController extends Controller
{



    /**
     * Fetch all services for the authenticated user.
     */
    public function index()
    {
        try {
            // Fetch services associated with the authenticated user's account role
            $userId = $this->getUserIdFromRole();
            $services = Service::where('user_id', $userId)->get();
            return response()->json($services, 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }
    // Define this function in your ServiceController or a dedicated UserRole service class
    private function getUserIdAndRole()
    {
        $user = Auth::user();
        $accountRole = $user->accountRoles()->whereIn('role_id', [1, 3])->first();  

        if ($accountRole) {
            return [
                'user_id' => $user->id,
                'role_id' => $accountRole->role_id,
            ];
        }
        
        // If the user does not have a permitted role
        return null;
    }

 
// public function store (Request $request)
//     {
//         try {
//             $user = Auth::user();
//             $account = $user->accountRoles()->first();

//             if (!$account || $account->role_id != 3) {
//                 return response()->json(['message' => 'Unauthorized. Only service providers can create services.'], 403);
//             }


//             $validatedData = $request->validate([
//                 'serviceName' => 'required|string|max:255',
//                 'serviceCategory' => 'required|string|max:255',
//                 'basePrice' => 'required|numeric|min:0',
//                 'pax' => 'required|integer|min:1',
//                 'requirements' => 'nullable|string',
//                 'availability_status' => 'boolean',
//             ]);

//             $validatedData['user_id'] = $user->id;
//             $validatedData['role_id'] = $user->role_id;
//             $validatedData['submitted_by'] = $user->name;
//             $validatedData['submitted_at'] = now();

//             $service = Service::create($validatedData);

//             return response()->json($service, 201);
//         } catch (ValidationException $e) {
//             return response()->json(['status' => 'error', 'errors' => $e->errors()], 422);
//         } catch (\Throwable $th) {
//             return response()->json(['message' => $th->getMessage()], 500);
//         }
//     }
    public function store(Request $request)
{
    try {
        // Check if the user has a permitted role
        $userRole = $this->getUserIdAndRole();
        if (!$userRole) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Proceed with validation and service creation
        $validatedData = $request->validate([
            'serviceName' => 'required|string|max:255',
            'serviceCategory' => 'required|string|max:255',
            'serviceFeatures' => 'required|string|max:255',
            'basePrice' => 'required|numeric|min:0',
            'pax' => 'required|integer|min:1',
            'requirements' => 'nullable|string',
            'availability_status' => 'boolean',
        ]);

        // Attach the authenticated user's ID and role ID if needed
        $validatedData['user_id'] = $userRole['user_id'];
        $validatedData['role_id'] = $userRole['role_id']; // Only if you want to store role_id

        $service = Service::create($validatedData);

        return response()->json($service, 201); // Created successfully
    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json(['status' => 'error', 'errors' => $e->errors()], 422);
    } catch (\Throwable $th) {
        return response()->json(['message' => $th->getMessage()], 500);
    }
}



    /**
     * Fetch a specific service by ID.
     */
    public function show($id)
    {
        try {
            $userId = $this->getUserIdFromRole(); // Get the user ID from account roles
            $service = Service::findOrFail($id);

            // Check if the authenticated user owns the service
            if ($service->user_id !== $userId) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            return response()->json($service, 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Update a specific service by ID.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'serviceName' => 'sometimes|required|string|max:255',
                'serviceCategory' => 'sometimes|required|string|max:255',
                'serviceFeatures' => 'sometimes|required|string|max:255',
                'basePrice' => 'sometimes|required|numeric|min:0',
                'pax' => 'sometimes|required|integer|min:1',
                'requirements' => 'nullable|string',
                'availability_status' => 'boolean',
            ]);

            $userId = $this->getUserIdFromRole(); // Get the user ID from account roles
            $service = Service::findOrFail($id);

            // Check if the authenticated user owns the service
            if ($service->user_id !== $userId) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $service->update($validatedData);
            return response()->json($service, 200); // Updated successfully
        } catch (ValidationException $e) {
            return response()->json(['status' => 'error', 'errors' => $e->errors()], 422);
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Delete a specific service by ID.
     */
    public function destroy($id)
    {
        try {
            $userId = $this->getUserIdFromRole(); // Get the user ID from account roles
            $service = Service::findOrFail($id);

            // Check if the authenticated user owns the service
            if ($service->user_id !== $userId) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $service->delete();
            return response()->json(['message' => 'Service deleted successfully'], 200); // Deleted successfully
        } catch (\Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 500);
        }
    }

    /**
     * Get user ID from account roles.
     */
    private function getUserIdFromRole()
    {
        // Assuming the AccountRole model has a relationship to fetch the user ID
        $role = AccountRole::where('user_id', Auth::id())->first();

        if (!$role) {
            throw new \Exception('User does not have an associated account role');
        }

        return $role->user_id; // Assuming 'user_id' is the foreign key in account_roles
    }
}
