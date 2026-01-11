<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use illuminate\Hashing\HashManager;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // $fields['password'] = bcrypt($fields['password']);
        $user = User::create($fields);
        $token = $user->createToken($request->name)->plainTextToken;


        return response()->json([
            'message' => 'User registered successfully',
            'data' => [
                'user' => $user,
                'token' => $token,
            ]
        ], 200);

        // return [
        //     'user' => $user,
        //     'token' => $token
        // ];
    }

    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|exists:users',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            // return response()->json(['message' => 'Invalid credentials'], 401);
            return [
                'errors' => [
                    'email' => ['The provided credentials are incorrect.']
                ]
            ];
        }

        $token = $user->createToken($user->email);

        return response()->json([
            'message' => 'User logged in successfully',
            'data' => [
                'user' => $user,
                'token' => $token->plainTextToken
            ]
        ], 200);


    }

    // Logout
    public function logout(Request $request)
    {
        // Invalidate the user's session or token
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
