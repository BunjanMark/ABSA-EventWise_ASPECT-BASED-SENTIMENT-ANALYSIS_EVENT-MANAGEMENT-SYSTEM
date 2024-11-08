<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    // Method to fetch all packages
    public function index()
{
    try {
        // Retrieve all packages
        $packages = Package::all();

        // Decode the 'services' JSON field for each package
        foreach ($packages as $package) {
            $package->services = json_decode($package->services, true); // Decode JSON to an array
        }

        return response()->json($packages, 200); // Return the updated packages with 200 status
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
}


    // Method to store a new package
    public function store(Request $request)
    {
        DB::beginTransaction(); // Start the transaction

        try {
            // Validate the incoming data
            $validatedData = $request->validate([
                'packageName' => 'required|string|max:255',
                'eventType' => 'required|string',
                'services' => 'nullable|array', // Make services nullable
                'totalPrice' => 'required|numeric|min:1',
                'coverPhoto' => 'nullable|url', // Ensure it's a valid URL
                'packageCreatedDate' => 'required|date',
            ]);

            // Ensure that 'services' is set to an empty array if not provided
            if (!isset($validatedData['services'])) {
                $validatedData['services'] = []; // Default to an empty array if services are not provided
            }

            // Create the package in the database
            $package = Package::create([
                'packageName' => $validatedData['packageName'],
                'eventType' => $validatedData['eventType'],
                'totalPrice' => $validatedData['totalPrice'],
                'coverPhoto' => $validatedData['coverPhoto'],
                'packageCreatedDate' => $validatedData['packageCreatedDate'],
                'services' => json_encode($validatedData['services']), // Store services as JSON
            ]);

            DB::commit(); // Commit the transaction

            return response()->json($package, 201); // Return the created package with 201 status

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack(); // Rollback the transaction in case of validation failure
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack(); // Rollback the transaction in case of other errors
            return response()->json([
                "status" => "error",
                "message" => $th->getMessage()
            ], 500);
        }
    }
}
