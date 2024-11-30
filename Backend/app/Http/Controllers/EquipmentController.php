<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use App\Models\AccountRole; // Add this import
class EquipmentController extends Controller
{
    // Fetch all equipment or filter by event_id
    public function index(Request $request)
{
    $eventId = $request->query('event_id');

    if ($eventId) {
        $equipment = Equipment::where('event_id', $eventId)->get();
    } else {
        $equipment = Equipment::all();
    }

    return response()->json($equipment);
}
    
// public function myEquipment(Request $request)
// {
//     $userId = Auth::id();
//     $accountRole = AccountRole::where('user_id', $userId)->where('role_id', 3)->first();

//     if (!$accountRole) {
//         return response()->json(['message' => 'You do not have the required role to access this equipment'], 403);
//     }

//     $eventId = $request->query('event_id');

//     if ($eventId) {
//         $equipment = Equipment::where('user_id', $userId)
//             ->where('account_role_id', $accountRole->id)
//             ->where('event_id', $eventId)
//             ->get();
//     } else {
//         $equipment = Equipment::where('user_id', $userId)
//             ->where('account_role_id', $accountRole->id)
//             ->get();
//     }

//     return response()->json($equipment);
// }

public function myEquipment(Request $request)
{
    $userId = Auth::id();
    $accountRole = AccountRole::where('user_id', $userId)->where('role_id', 3)->first();

    if (!$accountRole) {
        return response()->json(['message' => 'You do not have the required role to access this equipment'], 403);
    }

    $eventId = $request->query('event_id');

    if ($eventId) {
        $equipment = Equipment::where('user_id', $userId)
            // ->where('account_role_id', $accountRole->id)
            ->where('event_id', $eventId)
            ->get();
    } else {
        $equipment = Equipment::where('user_id', $userId)
            ->where('account_role_id', $accountRole->id)
            ->get();
    }

    return response()->json($equipment);
}
    // Store a new equipment entry
    // public function store(Request $request)
    // {
    //     // Validate the incoming data
    //     $validatedData = $request->validate([
    //         'item' => 'required|string',
    //         'number_of_items' => 'required|integer',
    //         'number_of_sort_items' => 'required|integer',
    //         'status' => 'nullable|string',
    //         'event_id' => 'required|exists:events,id'
    //     ]);

    //     // Create a new equipment entry
    //     $equipment = Equipment::create($validatedData);

    //     // Return the newly created item
    //     return response()->json($equipment, 201);
    // }
    public function getEquipmentForEvent($eventId)
    {
        $event = Event::find($eventId);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $equipment = Equipment::where('event_id', $eventId)->get();

        return response()->json($equipment);
    }
    public function getEquipmentForEventForUserId($eventId, $userId)
    {
        $event = Event::find($eventId);

        if (!$event) {
            return response()->json(['error' => 'Event not found'], 404);
        }

        $equipment = Equipment::where('event_id', $eventId)
            ->where('user_id', $userId)
            ->get();

        return response()->json($equipment);
    }
    public function myEquipments($eventId)
    {
        $equipments = Equipment::where('event_id', $eventId)
            ->where('user_id', 3)
            ->where('account_role_id', 3)
            ->get();
    
        return response()->json($equipments);
    }
    // Update an existing equipment entry
    public function update(Request $request, $id)
    {
        $equipment = Equipment::findOrFail($id);

        // Validate the incoming data
        $validatedData = $request->validate([
            'item' => 'sometimes|required|string',
            'number_of_items' => 'sometimes|required|integer',
            'number_of_sort_items' => 'sometimes|required|integer',
            'status' => 'nullable|string',
            'event_id' => 'sometimes|required|exists:events,id'
        ]);

        // Update the equipment entry
        $equipment->update($validatedData);

        return response()->json($equipment, 200);
    }

    // Delete an equipment entry
    public function destroy($id)
    {
        try {
            $equipment = Equipment::findOrFail($id);
            $equipment->delete();
            return response()->json(['message' => 'Item deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Item not found.'], 404);
        }
    }
}
