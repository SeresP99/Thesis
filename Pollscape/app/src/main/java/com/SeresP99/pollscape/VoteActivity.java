package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class VoteActivity extends AppCompatActivity {

    String token;
    String FingerprintAuthenticationKey;
    String message;
    int PollId;
    int VoteOptionId;
    String VoteOptionTitle;
    String VoteOptionDescription;
    Intent intent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vote);

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        token = sharedPreferences.getString("token", null);

        intent = getIntent();
        PollId = intent.getIntExtra("POLL_ID", -1);
        VoteOptionId = intent.getIntExtra("VOTE_OPTION_ID", -1);
        FingerprintAuthenticationKey = intent.getStringExtra("FINGERPRINT_AUTH_KEY");

        try {
            GetVoteOptionDetails(VoteOptionId);
        } catch (JSONException e) {
            Toast.makeText(this, "An error occured processing your request...", Toast.LENGTH_LONG).show();
            finish();
        }



        if (FingerprintAuthenticationKey == null) {
            message = "No fingerprint authentication was needed for poll number " + PollId +
                    "\nYou have chosen option with id: " + VoteOptionId;
        } else {
            message = "Fingerprint authentication key: " + FingerprintAuthenticationKey +
                    "\nYou have chosen option with id: " + VoteOptionId;
            ;
        }

        Button voteButton = findViewById(R.id.voteBtn);
        voteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                try {
                    Vote();
                } catch (JSONException e) {
                }
            }
        });
    }

    private void GetVoteOptionDetails(int id) throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://pollscape.ddns.net:4000/voteOptions/getPollOption";

        JSONObject optionId = new JSONObject();
        optionId.put("optionId", Integer.toString(id));

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, optionId,
                response -> {
                    Log.e("DETAILS", response.toString());
                    try {
                        JSONObject optionDetails = response.getJSONObject("option");
                        VoteOptionTitle = optionDetails.getString("title");
                        VoteOptionDescription = optionDetails.getString("description");
                        SetTextViews(VoteOptionTitle, VoteOptionDescription);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> {
                    Log.e("DETAILS", error.toString());
                }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("x-access-token", token);
                return params;
            }
        };
        queue.add(request);
    }

    private void SetTextViews(String title, String desc) {
        TextView voteOptionTitleTV = findViewById(R.id.voteOptionTitle);
        voteOptionTitleTV.setText(title);
        TextView voteOptionDescTV = findViewById(R.id.voteOptionDescription);
        voteOptionDescTV.setText(desc);
        if (desc.length() == 0)
            voteOptionDescTV.setText("No description.");
    }

    private void Vote() throws JSONException {
        RequestQueue queue = Volley.newRequestQueue(this);
        String url = "http://pollscape.ddns.net:4000/vote";

        JSONObject voteJson = new JSONObject();
        voteJson.put("pollOptionId", VoteOptionId);
        voteJson.put("pollVerificationKey", FingerprintAuthenticationKey);
        voteJson.put("pollId", PollId);

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.POST, url, voteJson,
                response -> {
                    Log.e("VOTE", response.toString());
                    ShowSuccessMsg();
                },
                error -> {
                    Log.e("VOTE", error.toString());
                }) {
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("x-access-token", token);
                return params;
            }
        };

        queue.add(request);
    }

    private void ShowSuccessMsg() {
        AlertDialog.Builder successMsg = new AlertDialog.Builder(this);
        successMsg.setTitle("Vote successfully cast!");
        successMsg.setMessage("You'll now be taken back to check the poll's standings!");
        successMsg.setPositiveButton("OK", null);
        successMsg.setCancelable(true);
        successMsg.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialogInterface) {
                finish();
            }
        });
        successMsg.create().show();


    }

}
