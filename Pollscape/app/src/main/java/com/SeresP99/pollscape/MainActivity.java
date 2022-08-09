package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    public static final String EXTRA_USERNAME = "com.example.plummy.username";
    public static final String EXTRA_PASSWORD = "com.example.plummy.password";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void buttonPress(View view) throws JSONException {
        //Toast.makeText(getApplicationContext(), "button was pressed", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(this, Dashboard.class);
        EditText usernametb = (EditText) findViewById(R.id.username);
        EditText passwordtb = (EditText) findViewById(R.id.password);

        String username = usernametb.getText().toString();
        String password = passwordtb.getText().toString();

        if (!username.equals("") && !password.equals("")) {
            PostLogin(username, password);
        }

        /*intent.putExtra(EXTRA_USERNAME, username);
        intent.putExtra(EXTRA_PASSWORD, password);

        startActivity(intent);*/
    }

    void PostLogin(String username, String password) throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(MainActivity.this);
        String url = "http://plummy.ddns.net:4000/login";

//        StringRequest stringRequest = new StringRequest(Request.Method.POST, url,
//                new Response.Listener<String>() {
//                    @Override
//                    public void onResponse(String response) {
//                        Toast.makeText(MainActivity.this, response, Toast.LENGTH_LONG).show();
//                    }
//                }, new Response.ErrorListener() {
//            @Override
//            public void onErrorResponse(VolleyError error) {
//                Toast.makeText(MainActivity.this, "An error has occurred...", Toast.LENGTH_LONG).show();
//            }
//        });

        JSONObject loginParams = new JSONObject();
        loginParams.put("username", username);
        loginParams.put("password", password);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, null,
                response ->
                {
                    try {
                        if (response.getBoolean("auth"))
                            Toast.makeText(MainActivity.this, "You are now logged in.", Toast.LENGTH_LONG).show();
                        else
                            Toast.makeText(MainActivity.this, "Wrong credentials.", Toast.LENGTH_LONG).show();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> Toast.makeText(MainActivity.this, error.toString(), Toast.LENGTH_LONG).show());

        queue.add(request);
    }


}