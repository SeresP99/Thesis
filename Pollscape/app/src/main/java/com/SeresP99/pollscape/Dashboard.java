package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.SeresP99.pollscape.recycleViews.adapters.DashboardButton_RecyclerViewAdapter;
import com.SeresP99.pollscape.recycleViews.models.DashboardButtonModel;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Dashboard extends AppCompatActivity {

    ArrayList<DashboardButtonModel> dashboardButtonModels = new ArrayList<DashboardButtonModel>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        String token = sharedPreferences.getString("token", null);

        checkAuth(token);

        TextView tokenLbl = (TextView) findViewById(R.id.tokenLabel);
        tokenLbl.setText(token);
        //Toast.makeText(Dashboard.this, token, Toast.LENGTH_LONG).show();

        RecyclerView recyclerView = findViewById(R.id.recycleView);
        setUpDashboard();
        DashboardButton_RecyclerViewAdapter adapter = new DashboardButton_RecyclerViewAdapter(this, dashboardButtonModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private void setUpDashboard() {
        String[] titles = new String[]{"Create", "My Own", "Participate", "Profile", "Logout"};
        String[] descriptions = new String[]{
                "Create your own polls and invite others to participate!",
                "Check how your polls are standing or edit them!",
                "Look over your profile details!",
                "Take part in polls and cast your vote!",
                "Hope to see you again soon!"
        };

        for (int i = 0; i < titles.length; i++) {
            dashboardButtonModels.add(new DashboardButtonModel(titles[i], descriptions[i]));
        }
    }

    private void JumpToLogin() {
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    public void participateBtnPress(View view) {
        Intent intent = new Intent(this, ParticipatedPollList.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    public void logOut(View view) {
        RemoveToken();
        JumpToLogin();

    }

    private void RemoveToken() {
        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        SharedPreferences.Editor myEdit = sharedPreferences.edit();

        myEdit.remove("token");

        myEdit.apply();
    }

    private void checkAuth(String token) {
        RequestQueue queue = Volley.newRequestQueue(Dashboard.this);


        String url = "http://pollscape.ddns.net:4000/auth/checkAuth";
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                response -> {
                    try {
                        if (!response.getBoolean("auth"))
                            JumpToLogin();
                    } catch (JSONException e) {
                        Toast.makeText(Dashboard.this, e.toString(), Toast.LENGTH_LONG).show();
                    }
                },
                error -> {
                    Toast.makeText(Dashboard.this, error.toString(), Toast.LENGTH_LONG).show();
                }) {
            @Override
            public Map<String, String> getHeaders() {
                Map<String, String> params = new HashMap<String, String>();
                params.put("x-access-token", token);
                return params;
            }
        };
        queue.add(request);
    }
}