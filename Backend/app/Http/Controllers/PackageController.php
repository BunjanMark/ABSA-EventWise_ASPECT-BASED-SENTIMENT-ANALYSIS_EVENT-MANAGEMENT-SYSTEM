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
                'package_id' => 'nullable|exists:packages,id',
                'packageName' => 'required|string|max:255',
                'eventType' => 'required|string',
                'packageType' => 'nullable|string',
                'services.*.serviceName' => 'required|string',
                'services.*.serviceCategory' => 'required|string',
                'services.*.basePrice'=> 'required|numeric',
                'totalPrice' => 'required|numeric|min:1',
                'coverPhoto' => 'nullable|url',
                'packageCreatedDate' => 'nullable|date',
            ]);

            // Ensure 'services' is an empty array if not provided
            $validatedData['services'] = $validatedData['services'] ?? [];

            // Handle nullable fields
            $coverPhoto = $validatedData['coverPhoto'] ?? null;
            $packageCreatedDate = $validatedData['packageCreatedDate'] ?? null;

            // Determine the package type
            $packageType = count($validatedData['services']) > 0 ? 'Custom' : 'Pre-Defined';

            // Create a new package
            $package = Package::create([
                'packageName' => $validatedData['packageName'],
                'eventType' => $validatedData['eventType'],
                'packageType' => $packageType,
                'totalPrice' => $validatedData['totalPrice'],
                'coverPhoto' => $coverPhoto,
                'packageCreatedDate' => $packageCreatedDate,
                'services' => json_encode($validatedData['services']),
            ]);

            DB::commit(); // Commit the transaction

            return response()->json($package, 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                "status" => "error",
                "message" => $th->getMessage()
            ], 500);
        }
    }

    // Method to add a new service to an existing package
    public function addService(Request $request, $packageId)
    {
        DB::beginTransaction();

        try {
            // Validate the incoming data for the new service
            $validatedData = $request->validate([
                'serviceName' => 'required|string',
                'serviceCategory' => 'required|string',
                'basePrice' => 'required|numeric',
            ]);

            // Fetch the existing package
            $package = Package::find($packageId);

            if (!$package) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Package not found.',
                ], 404);
            }

            // Decode the current services array from the package
            $currentServices = json_decode($package->services, true) ?? [];

            // Create a new service array
            $newService = [
                'serviceName' => $validatedData['serviceName'],
                'serviceCategory' => $validatedData['serviceCategory'],
                'basePrice' => $validatedData['basePrice'],
            ];

            // Append the new service to the current services array
            $currentServices[] = $newService;

            // Update the package with the new services list
            $package->services = json_encode($currentServices);
            $package->save();

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Service added successfully.',
                'package' => $package,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
