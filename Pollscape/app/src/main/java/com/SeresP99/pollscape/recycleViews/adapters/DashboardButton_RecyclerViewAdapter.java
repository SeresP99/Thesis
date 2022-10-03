package com.SeresP99.pollscape.recycleViews.adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.SeresP99.pollscape.ParticipatedPollList;
import com.SeresP99.pollscape.R;
import com.SeresP99.pollscape.recycleViews.models.DashboardButtonModel;
import com.SeresP99.pollscape.webViewActivity;

import java.util.ArrayList;

public class DashboardButton_RecyclerViewAdapter extends RecyclerView.Adapter<DashboardButton_RecyclerViewAdapter.MyViewHolder> {

    Context context;
    ArrayList<DashboardButtonModel> dashboardButtonModels;

    public DashboardButton_RecyclerViewAdapter(Context context, ArrayList<DashboardButtonModel> dashboardButtonModels){
        this.context = context;
        this.dashboardButtonModels = dashboardButtonModels;
    }

    @NonNull
    @Override
    public DashboardButton_RecyclerViewAdapter.MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.dashboard_recyclerview_row, parent, false);
        return new DashboardButton_RecyclerViewAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull DashboardButton_RecyclerViewAdapter.MyViewHolder holder, int position) {
        holder.title.setText(dashboardButtonModels.get(position).getTitle());
        holder.description.setText(dashboardButtonModels.get(position).getDescription());
        holder.url = dashboardButtonModels.get(position).getUrl();
        holder.context = context;
    }

    @Override
    public int getItemCount() {
        return dashboardButtonModels.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        TextView title;
        TextView description;
        String url;
        Context context;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);

            title = itemView.findViewById(R.id.cardTitle);
            description = itemView.findViewById(R.id.cardDesc);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(context, webViewActivity.class);
                    intent.putExtra("URL", url);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(intent);
                }
            });
        }
    }
}
