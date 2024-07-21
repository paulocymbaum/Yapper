# CreateUser Function

The `CreateUser` function is a Deno server-side function that allows you to create a new user in a Supabase database. It takes in user information such as email, password, first name, last name, profile picture URL, user type, and teacher ID (if applicable), and creates a new user in the Supabase Auth and inserts their details into the `users` table in the Supabase database.

## Usage

To use the `CreateUser` function, you'll need to provide the following environment variables:

- `SUPABASE_URL`: The URL of your Supabase instance.
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for your Supabase instance.

You can then call the function with the following parameters:

- `email`: The email address of the new user.
- `password`: The password for the new user.
- `firstname`: The first name of the new user.
- `surname`: The last name of the new user.
- `photo_url`: The URL of the new user's profile picture (optional).
- `user_type`: The type of user (e.g., "student", "teacher", "admin") (optional).
- `teacher_id`: The ID of the teacher associated with the new user (optional).

The function will create the new user in Supabase Auth and insert their details into the `users` table. If the operation is successful, it will return a response with a success message. If there are any errors, it will return a response with an error message and a 400 or 500 status code.

## Example Usage

Here's an example of how you might use the `CreateUser` function in a client-side application:

```javascript
const response = await fetch('/create-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'example@example.com',
    password: 'secretpassword',
    firstname: 'John',
    surname: 'Doe',
    photo_url: 'https://example.com/profile.jpg',
    user_type: 'student',
    teacher_id: 'abc123',
  }),
});

if (response.ok) {
  console.log('User created successfully');
} else {
  const { error } = await response.json();
  console.error('Error creating user:', error);
}
```

## Error Handling

The `CreateUser` function handles several types of errors:

- If there is an error creating the user in Supabase Auth, the function will return a 400 status code and the error message.
- If the user ID is not found after creating the user in Supabase Auth, the function will return a 400 status code and an error message.
- If there is an error inserting the user details into the `users` table, the function will return a 400 status code and the error message.
- If there is any other unexpected error, the function will return a 500 status code and the error message.

You can handle these errors in your client-side application by checking the status code and error message in the response.
