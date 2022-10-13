package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.widget.TextView;

public class VoteActivity extends AppCompatActivity {

    String token;
    String FingerprintAuthenticationKey;
    String message;
    ConstraintLayout mMainLayout;
    int PollId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_vote);

        SharedPreferences sharedPreferences = getSharedPreferences("MySharedPref", MODE_PRIVATE);
        token = sharedPreferences.getString("token", null);

        Intent intent = getIntent();
        PollId = intent.getIntExtra("POLL_ID", -1);
        FingerprintAuthenticationKey = intent.getStringExtra("FINGERPRINT_AUTH_KEY");
        TextView testText = findViewById(R.id.testText);



        if (FingerprintAuthenticationKey == null){
            message = "No fingerprint authentication was needed for poll number " + PollId;
        }
        else {
            message = "Fingerprint authentication key: " + FingerprintAuthenticationKey;
        }

        testText.setText(message);
    }
}
