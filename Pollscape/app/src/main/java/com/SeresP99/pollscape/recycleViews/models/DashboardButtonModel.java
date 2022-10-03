package com.SeresP99.pollscape.recycleViews.models;

public class DashboardButtonModel {
    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    String title;

    public String getUrl() {
        return url;
    }

    String description;
    String url;

    public DashboardButtonModel(String title, String description, String url) {
        this.title = title;
        this.description = description;
        this.url = url;
    }
}
