<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;
use App\Models\Service; // Ensure you import the Service model
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    // Method to fetch all packages
    public function index()
    {
        try {
            // Retrieve all packages with the related services
            $packages = Package::with('services')->get();

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
                'packageType' => 'nullable|string',
                'services' => 'required|array', // Ensure it's an array of services
                'totalPrice' => 'required|numeric|min:1',
                'coverPhoto' => 'nullable|url',
                'packageCreatedDate' => 'nullable|date',
            ]);

            // Handle nullable fields
            $coverPhoto = $validatedData['coverPhoto'] ?? null;
            $packageCreatedDate = $validatedData['packageCreatedDate'] ?? null;

            // Create the package
            $package = Package::create([
                'packageName' => $validatedData['packageName'],
                'eventType' => $validatedData['eventType'],
                'packageType' => 'Pre-Defined', // You can use custom logic for this
                'totalPrice' => $validatedData['totalPrice'],
                'coverPhoto' => $coverPhoto,
                'packageCreatedDate' => $packageCreatedDate,
                'services' => json_encode($validatedData['services']), // Store services as JSON
            ]);

            // Attach services to the package
            foreach ($validatedData['services'] as $serviceData) {
                // First create or find the service by name or category
                $service = Service::firstOrCreate([
                    'serviceName' => $serviceData['serviceName'],
                    'serviceCategory' => $serviceData['serviceCategory'],
                    'basePrice' => $serviceData['basePrice'],
                ]);

                // Attach the service to the package using the pivot table
                $package->services()->attach($service->id);
            }

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
                "message" => $th->getMessage(),
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

            // Find or create the service
            $service = Service::firstOrCreate([
                'serviceName' => $validatedData['serviceName'],
                'serviceCategory' => $validatedData['serviceCategory'],
                'basePrice' => $validatedData['basePrice'],
            ]);

            // Attach the service to the package
            $package->services()->attach($service->id);

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
