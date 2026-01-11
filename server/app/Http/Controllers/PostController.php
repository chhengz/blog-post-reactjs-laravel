<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Support\Facades\Gate;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::with('user')->latest()->get();
        // return response()->json([
        //     'message' => 'Posts retrieved successfully',
        //     'data' => Post::all()
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            // 'user_id' => 'required|exists:users,id',
        ]);

        $post = $request->user()->posts()->create($fields);

        // return response()->json([
        //     'message' => 'Post created successfully',
        //     'data' => $post
        // ], 200);

        return [
            'message' => 'Post created successfully',
            'data'=> $post
        ];

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        // return $post;
        return response()->json([
            'message' => 'Post retrieved successfully',
            'data'=> $post,
            'user' => $post->user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {

        Gate::authorize('modify', $post);

        // Validate the request data
        $fields = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            // 'user_id' => 'sometimes|required|exists:users,id',
        ]);
        // Update the post
        $post->update($fields);
        // Return a response
        return response()->json([
            'message' => 'Post updated successfully',
            'data' => $post
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        Gate::authorize('modify', $post);
        // $post->delete();
        $post->delete();
        return response()->json([
            'message' => 'Post deleted successfully',
        ]);
    }
}
