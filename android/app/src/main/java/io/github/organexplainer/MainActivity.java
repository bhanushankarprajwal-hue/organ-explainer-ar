package io.github.organexplainer;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.view.Gravity;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

// Organ Explainer launcher for Meta Quest.
// The 3D and VR part runs in the headset's own browser (Meta Quest Browser),
// because that browser has WebXR: hand tracking, controllers and passthrough.
// This app opens Quest mode there. If that fails, it shows a button to try again.
public class MainActivity extends Activity {
  static final String URL = "https://bhanushankarprajwal-hue.github.io/organ-explainer-ar/xr.html";
  static final String QUEST_BROWSER = "com.oculus.browser";

  @Override protected void onCreate(Bundle b) {
    super.onCreate(b);
    LinearLayout box = new LinearLayout(this);
    box.setOrientation(LinearLayout.VERTICAL);
    box.setGravity(Gravity.CENTER);
    box.setPadding(60, 60, 60, 60);
    box.setBackgroundColor(Color.rgb(247, 245, 241));
    TextView title = new TextView(this);
    title.setText("Organ Explainer");
    title.setTextSize(30); title.setTextColor(Color.rgb(28, 36, 48)); title.setGravity(Gravity.CENTER);
    TextView text = new TextView(this);
    text.setText("Opening Quest mode in the Meta Quest browser…\nThen press \"Enter mixed reality\" or \"Enter VR\".\n\nFor education only. Not for diagnosis.");
    text.setTextSize(18); text.setTextColor(Color.rgb(61, 70, 84)); text.setGravity(Gravity.CENTER); text.setPadding(0, 24, 0, 24);
    Button open = new Button(this);
    open.setText("Open Quest mode");
    open.setOnClickListener(v -> openApp());
    box.addView(title); box.addView(text); box.addView(open);
    setContentView(box);
    openApp();
  }

  void openApp() {
    Uri u = Uri.parse(URL);
    Intent i = new Intent(Intent.ACTION_VIEW, u);
    i.setPackage(QUEST_BROWSER);
    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    try { startActivity(i); return; } catch (ActivityNotFoundException e) { /* not a Quest: use any browser */ }
    try { startActivity(new Intent(Intent.ACTION_VIEW, u).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); } catch (ActivityNotFoundException e) { }
  }
}
