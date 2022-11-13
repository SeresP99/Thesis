package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.SeresP99.pollscape.recycleViews.adapters.VoteOption_RecyclerViewAdapter;
import com.SeresP99.pollscape.recycleViews.models.VoteOptionModel;
import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class VoteOptionListActivity extends AppCompatActivity {

    private ArrayList<VoteOptionModel> voteOptionModels = new ArrayList<>();
    Integer PollId;
    String Title;
    boolean requiresFingerprint;
    String token;
    VoteOption_RecyclerViewAdapter adapter;
    RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vote_option_list);

        Intent intent = getIntent();
        PollId = intent.getIntExtra("POLL_ID", -1);
        Log.i("POLL_ID", PollId.toString());

        try {
            getPollDetails();
        } catch (Exception e) {
            Toast.makeText(this, e.toString(), Toast.LENGTH_SHORT).show();
        }

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        token = sharedPreferences.getString("token", null);

        recyclerView = findViewById(R.id.voteOptionRecyclerView);
        adapter = new VoteOption_RecyclerViewAdapter(this, voteOptionModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    @Override
    protected void onResume() {
        super.onResume();

        RequestQueue queue = Volley.newRequestQueue(this);

        String url = "http://pollscape.ddns.net:4000/vote/checkAlreadyVoted";
        JSONObject requestJson = new JSONObject();
        try {
            requestJson.put("pollId", PollId);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        Log.i("POLL_ID", requestJson.toString());

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, requestJson,
                response -> {
                    try {
                        if (response.getString("alreadyVoted").equals("true")) {
                            finish();
                        }
                    } catch (JSONException e) {
                        Toast.makeText(this, e.toString(), Toast.LENGTH_SHORT).show();
                    }

                },
                error -> {
                    Log.e("CHECK", error.toString());
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

    private void updateRecyclerView() {
        recyclerView = findViewById(R.id.voteOptionRecyclerView);
        adapter = new VoteOption_RecyclerViewAdapter(this, voteOptionModels);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
    }

    private void getPollDetails() throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://pollscape.ddns.net:4000/poll/getPollDetails";

        JSONObject pollId = new JSONObject();
        pollId.put("pollId", Integer.toString(PollId));

        TextView titleTextView = findViewById(R.id.titleTextView);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, pollId,
                response -> {
                    try {
                        JSONObject pollDetails = response.getJSONObject("pollDetails");
                        Title = pollDetails.getString("title");
                        titleTextView.setText(Title);
                        requiresFingerprint = pollDetails.getString("requires_fingerprint").equals("true");
                        getVoteOptions();
                    } catch (JSONException e) {
                        Log.e("REQUEST", "ERROR " + e);
                    }
                },
                error -> {
                    Log.e("REQUEST", "Error getting poll details: " + error.toString());
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

    private void getVoteOptions() throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://pollscape.ddns.net:4000/voteOptions/getPollOptions";

        JSONObject pollId = new JSONObject();
        pollId.put("pollId", Integer.toString(PollId));

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, pollId,
                response -> {
                    Log.i("REQUEST", "ERROR " + response.toString());

                    JSONObject mainObject;
                    try {
                        mainObject = new JSONObject(response.toString());
                        JSONArray voteOptionArray = mainObject.getJSONArray("options");
                        for (int i = 0; i < voteOptionArray.length(); i++) {
                            JSONObject voteOption = voteOptionArray.getJSONObject(i);
                            String title = voteOption.getString("title");
                            String description = voteOption.getString("description");
                            int id = Integer.parseInt(voteOption.getString("id"));
                            Log.i("MYNOTE", "title: " + title + " desc: " + description + " id: " + id);
                            voteOptionModels.add(new VoteOptionModel(title, description, id, PollId, requiresFingerprint));
                        }
                        updateRecyclerView();
                    } catch (JSONException e) {
                        Log.i("REQUEST", "ERROR " + e);
                    }
                }, error -> Log.i("REQUEST", "ERROR " + error.toString())) {
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