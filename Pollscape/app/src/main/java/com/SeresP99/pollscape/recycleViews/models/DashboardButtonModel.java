package com.SeresP99.pollscape.recycleViews.models;

public class DashboardButtonModel {
    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    String title;
    String description;


    public DashboardButtonModel(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
