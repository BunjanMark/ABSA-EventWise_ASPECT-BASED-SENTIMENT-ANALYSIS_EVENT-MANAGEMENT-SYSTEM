<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    // Fetch all equipment or filter by event_id
    public function index(Request $request)
    {
        $eventId = $request->query('event_id');
    
        if ($eventId) {
            $equipments = Equipment::where('event_id', $eventId)->get();
        } else {
            $equipments = Equipment::all(); // Get all equipment if no event_id is provided
        }
    
        return response()->json($equipments);
    }
    


    // Store a new equipment entry
    public function store(Request $request)
    {
        // Validate the incoming data
        $validatedData = $request->validate([
            'item' => 'required|string',
            'number_of_items' => 'required|integer',
            'number_of_sort_items' => 'required|integer',
            'status' => 'nullable|string',
            'event_id' => 'required|exists:events,id'
        ]);

        // Create a new equipment entry
        $equipments = Equipment::create($validatedData);

        // Return the newly created item
        return response()->json($equipments, 201);
    }

    // Update an existing equipment entry
    public function update(Request $request, $id)
    {
        $equipments = Equipment::findOrFail($id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'item' => 'sometimes|required|string',
            'number_of_items' => 'sometimes|required|integer',
            'number_of_sort_items' => 'sometimes|required|integer',
            'status' => 'nullable|string',
            'event_id' => 'sometimes|required|exists:events,id'
        ]);

        // Update the equipment entry
        $equipments->update($validatedData);

        return response()->json($equipments, 200);
    }

    // Delete an equipment entry
    public function destroy($id)
    {
        try {
            $equipments = Equipment::findOrFail($id);
            $equipments->delete();
            return response()->json(['message' => 'Item deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Item not found.'], 404);
        }
    }
}
