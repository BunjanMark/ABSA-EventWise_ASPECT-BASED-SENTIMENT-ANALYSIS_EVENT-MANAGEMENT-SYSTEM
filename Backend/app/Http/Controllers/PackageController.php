<?php

// app/Http/Controllers/PackageController.php

// app/Http/Controllers/PackageController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validatedData = $request->validate([
                'packageName' => 'required|string|max:255',
                'eventType' => 'required|string',
                'services' => 'required|array',
                'totalPrice' => 'required|numeric|min:1',
                'coverPhoto' => 'nullable|url', // Ensure it's a valid URL
                'packageCreatedDate' => 'required|date',
            ]);

            // Create the package in the database
            $package = Package::create($validatedData);

            DB::commit();

            return response()->json($package, 201); // Return the created package with 201 status

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            // Handle validation errors
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack();
            // Handle other errors
            return response()->json([
                "status" => "error",
                "message" => $th->getMessage()
            ], 500);
        }
    }
}
