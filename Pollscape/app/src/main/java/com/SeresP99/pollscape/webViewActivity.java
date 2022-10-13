package com.SeresP99.pollscape;

import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.AlphaAnimation;
import android.view.animation.Animation;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class webViewActivity extends AppCompatActivity {

    WebView webView;
    Integer highlightedOption;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);

        String token = getSharedPreferences("MySharedPref", MODE_PRIVATE).getString("token", null);

        webView = (WebView) findViewById(R.id.webview);
        webView.setBackgroundColor(Color.BLACK);

        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
                String[] message = consoleMessage.message().split(":");
                Log.i("POLL ID", consoleMessage.toString());
                if (message[0].equals("pollId"))
                    try {
                        highlightedOption = Integer.parseInt(message[1]);
                    } catch (Exception ignored) {
                    }
                return super.onConsoleMessage(consoleMessage);
            }
        });

        webView.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView webView, String url) {
                setLocalStorageToken(token);
                fadeIn(webView);
            }

            public void onLoadResource(WebView view, String url) {
                String currentMenu = getEndpointFromUrl(view.getUrl());
                if (currentMenu.equals("dashboard")) {
                    view.loadUrl("");
                    backToDash();
                }
                if (currentMenu.equals("vote")) {
                    goToVote();
                    view.loadUrl("http://pollscape.ddns.net:3000/joinedPolls");
                }
            }


        });
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webView.loadUrl(getIntent().getStringExtra("URL"));
    }

    private String getEndpointFromUrl(String url) {
        String[] uriElements = url.split("/");
        return uriElements[uriElements.length - 1];
    }

    private void goToVote() {
        if (highlightedOption != null) {
            Intent intent = new Intent(this, VoteOptionListActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra("POLL_ID", highlightedOption);
            startActivity(intent);
        }
    }

    private void backToDash() {
        Intent intent = new Intent(this, Dashboard.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    private void setLocalStorageToken(String token) {
        String setLocalStorageToken = "localStorage.setItem(\"token\", \"" + token + "\");";
        String setLocalStoragePlatform = "localStorage.setItem(\"platform\", \"android\");";
        //localStorage.setItem("token", res.data.token);
        webView.evaluateJavascript(setLocalStorageToken, null);
        webView.evaluateJavascript(setLocalStoragePlatform, null);
    }

    private void Toast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }

    private void fadeIn(WebView webView) {
        Animation fadeIn = new AlphaAnimation(0, 1);
        fadeIn.setInterpolator(new AccelerateInterpolator());
        fadeIn.setDuration(1000);

        fadeIn.setAnimationListener(new Animation.AnimationListener() {
            public void onAnimationEnd(Animation animation) {
                //imageView.setVisibility(View.GONE);
            }

            public void onAnimationRepeat(Animation animation) {
            }

            public void onAnimationStart(Animation animation) {
            }
        });

        webView.startAnimation(fadeIn);
    }
}