# PotentialSubsBot

## Description

A Reddit bot, which silently checks /r/.... links in comments and saves the vote counts in cases where there is no actual sub. 
It then collates and posts the data in the connected subreddit [r/PotentialSubreddits](reddit.com/r/PotentialSubreddits).

The goal of the subreddit is to help Reddit community create new subreddits.

Please note that the speed at which subreddits are found is limited by Reddit API.

### Behavoiur
* It scrapes the top [25](constants.js)(minimum) submissions of [25000](constants.js) most popular [subreddits](top_subreddits.txt).
* Once it finds [25](constants.js) matches, it submits a text post of the result on [r/PotentialSubreddits](reddit.com/r/PotentialSubreddits).
* It only scrapes Reddit's default comment view, i.e. it doesn't check every single comment in a submission.
* It only considers matches with 3+ upvotes 
* It doesn't ignore duplicates, therefore if a duplicate shows up - whether in the same submission or some other place on Reddit - it still counts as a new seprate entry.
* Every match is recorded to a file along with the comment id and comment upvotes.

## Packages used
*  snoowrap
*  fs
*  readline

## Contribute?

Contributions are most welcome!

Bugs: open an issue here.

New features: open an issue here or submit a text post of the feature that you want to add on [r/PotentialSubreddits](reddit.com/r/PotentialSubreddits). If it's usefull for the community, feel free to send a pull request with the included feature.

## Example

### First result of the week. Top Potential Subreddits: r/starship17 with 255, r/lumberjackingoff with 228 and r/Uyhgur with 94 upvotes

#### Potential Subreddits found today

If on mobile: please scroll to the right to view the full table.

|Potential Subreddit|Parent Subreddit|Comment|Upvotes|
|:-|-:|-:|-:|
|r/starship17|r/todayilearned|[permalink](/r/todayilearned/comments/fbbf10/til_about_donald_watts_a_florida_resident_police/fj3qbgu/)|255
|r/lumberjackingoff|r/gifs|[permalink](/r/gifs/comments/fa0ui6/saw_a_post_where_a_guy_cut_a_tree_between_two/fivtu7r/)|228
|r/Uyhgur|r/worldnews|[permalink](/r/worldnews/comments/f94lca/chinese_diplomat_to_australia_grilled_over/fipl0qs/)|94
|r/unexpectedDFW|r/pics|[permalink](/r/pics/comments/fbla9g/one_of_my_bar_regulars_waited_84_years_for_his/fj5ljwk/)|69
|r/unexpectedmidsommar|r/IAmA|[permalink](/r/IAmA/comments/fad232/since_1983_i_have_lived_worked_and_raised_a/fiy1frh/)|62
|r/iam14|r/videos|[permalink](/r/videos/comments/fah0mw/zach_dela_rocha_ratm_stops_a_concert_for_sexual/fiyz3s4/)|50
|r/subredditIfellfor|r/aww|[permalink](/r/aww/comments/f8z2oz/im_just_gonna_snuggle_up_right_in_here/fionk4c/)|49
|r/unexpectednewday|r/gaming|[permalink](/r/gaming/comments/f9ctzq/what_happened_to_just_put_the_disc_in_and_play/fir2i7v/)|46
|r/unexpectedemotions|r/AskReddit|[permalink](/r/AskReddit/comments/fbrn0e/dog_owners_of_reddit_would_you_cut_of_5_years_of/fj6h8cx/)|45
|r/SanFranciscoPD|r/gaming|[permalink](/r/gaming/comments/fayn2b/to_the_police_department_please/fj1ky1b/)|41
|r/expectednewday|r/gaming|[permalink](/r/gaming/comments/f9ctzq/what_happened_to_just_put_the_disc_in_and_play/firineu/)|37
|r/UnexpectedLeatherface|r/funny|[permalink](/r/funny/comments/fbvml5/shhhhh_just_let_it_happen/fj7dz4z/)|28
|r/missedpunchlines|r/funny|[permalink](/r/funny/comments/f9710w/just_to_turn_a_page/fiq6fhk/)|21
|r/suddenlyghibli|r/gaming|[permalink](/r/gaming/comments/fblczy/geralt_of_weebia/fj5acxh/)|19
|r/bluecollarkids|r/pics|[permalink](/r/pics/comments/f9kr1b/caught_my_3yo_boy_under_his_car_and_he_said_i/fisqbim/)|17
|r/returntomasters|r/aww|[permalink](/r/aww/comments/f8zte8/this_is_how_my_new_kittens_react_when_i_get_home/fipat9k/)|13
|r/deepfriedearthporn|r/EarthPorn|[permalink](/r/EarthPorn/comments/fatw8c/the_moonrise_above_a_summit_in_iceland_while_the/fj1dx0d/)|13
|r/TIFUForScience|r/Showerthoughts|[permalink](/r/Showerthoughts/comments/f8oscz/every_time_you_fall_asleep_you_are_putting/fin7dhl/)|8
|r/expectedapexlegends|r/pics|[permalink](/r/pics/comments/f8zk3k/pie_octane/fipfefm/)|5
|r/totallynotme_ira|r/announcements|[permalink](/r/announcements/comments/f8y9nx/spring_forward_into_reddits_2019_transparency/fip43o0/)|3
|r/unexpectedcomunism|r/funny|[permalink](/r/funny/comments/fbcncm/wine_glass_music/fj3wj18/)|3
|r/ToeTax|r/aww|[permalink](/r/aww/comments/fbnftw/hospitals_dressed_leap_day_babies_as_frogs_and/fj65cj9/)|3
|r/satisfelling|r/gifs|[permalink](/r/gifs/comments/fa0ui6/saw_a_post_where_a_guy_cut_a_tree_between_two/fix31l2/)|3
|r/MeanGeneForScale|r/gifs|[permalink](/r/gifs/comments/fb5ze5/andre_the_giant_using_mean_gene_for_scale/fj3c09k/)|3
|r/EarthPoon|r/EarthPorn|[permalink](/r/EarthPorn/comments/f8peya/a_photo_i_took_five_years_ago_in_the_cloud/fin8yu6/)|3
---
### Useful Subreddits 
- r/SubsIFellFor
- r/birthofasub 

___
&nbsp;[programmer](https://www.reddit.com/message/compose/?toempty_vacuum=)&nbsp;|&nbsp;[source&nbsp;code](https://github.com/mt-empty/potentialSubsBot)&nbsp;|&nbsp;[r/PotentialSubreddits](reddit.com/r/PotentialSubreddits)&nbsp;
