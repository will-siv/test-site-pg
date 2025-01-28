#!/bin/python3
# create db file with tables for current song and now playing
# id | time | song_name | image_id | is_playing

import sqlite3

cx = sqlite3.connect("foo.db")

cu = cx.cursor()
cx.execute("""create table nowplaying(
           id int,
           timestamp time,
           song_name varchar(128),
           image_id char(41),
           primary key (id)
           )""")

cx.execute("""create table playinginfo(
           boolean isPlaying
           )""")
