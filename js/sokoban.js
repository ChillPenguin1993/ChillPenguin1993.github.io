
// Get the canvas and context
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");

// Set the framerate for the game
setInterval(_update, 1000 / 60);

// Get image resources
var spr_penguin = [];
var spr_tiles = [];
var spr_chest;
spr_penguin.push(document.getElementById("p_down_1"));
spr_penguin.push(document.getElementById("p_down_2"));
spr_penguin.push(document.getElementById("p_left_1"));
spr_penguin.push(document.getElementById("p_left_2"));
spr_penguin.push(document.getElementById("p_up_1"));
spr_penguin.push(document.getElementById("p_up_2"));
spr_penguin.push(document.getElementById("p_right_1"));
spr_penguin.push(document.getElementById("p_right_2"));
spr_tiles.push(document.getElementById("t_ground"));
spr_tiles.push(document.getElementById("t_wall"));
spr_tiles.push(document.getElementById("t_incomplete"));
spr_tiles.push(document.getElementById("t_complete"));
spr_chest = document.getElementById("t_chest");

// Set up game variables
// Map:
const _m_width = 16;
const _m_height = 12;
const _m_levels = 1;
const _m_tile_map = [ [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 0
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Small Spiral
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 1
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Rotate And Stack
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 2
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Enclosed
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 3
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Block Off
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 4
    1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, // Large Spiral
    1, 1, 1, 0, 0, 0, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 2, 0, 1, 1, 1, 1,
    1, 1, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 0, 2, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 5
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Tiny Corner
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 2, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 3, 2, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 6
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Smallest Square
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 0, 2, 0, 2, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 2, 0, 2, 0, 2, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 7
    1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, // Large Corner
    1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 1, 1,
    1, 1, 0, 0, 0, 1, 0, 0, 1, 2, 0, 2, 2, 2, 1, 1,
    1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 8
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Treasure Room
    1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 2, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1,
    1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 1,
    1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 2, 2, 2, 1, 1,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
], [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // Level 9
    1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // You Win!
    1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1,
    1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1,
    1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1,
    1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1,
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
] ];
const _m_entities = [ [ 
    8, 6, // Penguin coords

    7, 5, // List of box coords
    9, 5,
    7, 6,
    8, 7
], [
    6, 3, // Level 1
          // Rotate And Stack
    6, 4,
    7, 4,
    6, 5
], [
    6, 4, // Level 2
          // Enclosed
    7, 4,
    7, 5,
    8, 6,
    7, 7,
    8, 8
], [
    6, 3, // Level 3
          // Block Off
    7, 4,
    6, 7,
    9, 8
], [
    13, 8, // Level 4
           // Large Spiral
    6, 4,
    8, 4,
    7, 5,
    6, 6,
    8, 6
], [
    10, 9, // Level 5
           // Tiny Corner
    8, 4,
    7, 5,
    10, 5,
    8, 6,
    7, 7,
    10, 7
], [
    7, 5, // Level 6
          // Smallest Square
    6, 4,
    7, 4,
    8, 4,
    6, 5,
    8, 5,
    6, 6,
    7, 6,
    8, 6
], [
    4, 4, // Level 7
          // Large Corner
    3, 4,
    4, 5,
    8, 5,
    11, 5,
    12, 5,
    6, 6,
    10, 6,
    3, 7,
    9, 7,
    12, 7,
    8, 8,
    5, 9,
    7, 9,
    9, 9
], [
    12, 5, // Level 8
           // Treasure Room
    4, 3,
    6, 3,
    6, 4,
    4, 5,
    5, 5,
    6, 5,
    10, 5,
    6, 6,
    9, 6,
    6, 7,
    8, 7
], [
    7, 3, // Level 9
          // You Win!
    7, 7,
    14, 10
] ];
var m_level = 0;

// Input:
var i_keys = [ false, false, false, false ];
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

// Penguin:
const _p_anim_speed = 30; // 30 game frames per penguin animation frame
var p_anim_frame = 0;
var p_anim_progress = 0;
var p_direction = 0; // 0: down, 1: left, 2: up, 3: right
const _p_move_speed = 2;
var p_movement = 16;
var p_pos_x = 32;
var p_pos_y = 32;

// Boxes:
const _b_move_speed = 1;
var b_moving_box = -1; // -1: none, otherwise this is the index in array
var b_count = 2;
var b_pos_x = [128, 112];
var b_pos_y = [96, 80];

changeLevel(m_level);

function _update()
{
    for (var i = 0; i < _m_width; i++)
    {
        for (var j = 0; j < _m_height; j++)
        {
            context.drawImage(spr_tiles[_m_tile_map[m_level][j * _m_width + i]], i * 16, j * 16); 
        }
    }

    p_anim_progress++;
    if (p_anim_progress > _p_anim_speed)
    {
        p_anim_progress -= _p_anim_speed;
        p_anim_frame = 1 - p_anim_frame;
    }

    if (p_movement < 16)
    {
        // Currently moving - don't accept new input

        if (b_moving_box == -1)
        {
            switch (p_direction)
            {
                case 0:
                    p_pos_y += _p_move_speed;
                    break;
            
                case 1:
                    p_pos_x -= _p_move_speed;
                    break;
            
                case 2:
                    p_pos_y -= _p_move_speed;
                    break;

                case 3:
                    p_pos_x += _p_move_speed;
                    break;
            }

            p_movement += _p_move_speed;
        }
        else
        {
            switch (p_direction)
            {
                case 0:
                    p_pos_y += _b_move_speed;
                    b_pos_y[b_moving_box] += _b_move_speed;
                    break;
            
                case 1:
                    p_pos_x -= _b_move_speed;
                    b_pos_x[b_moving_box] -= _b_move_speed;
                    break;
            
                case 2:
                    p_pos_y -= _b_move_speed;
                    b_pos_y[b_moving_box] -= _b_move_speed;
                    break;

                case 3:
                    p_pos_x += _b_move_speed;
                    b_pos_x[b_moving_box] += _b_move_speed;
                    break;
            }

            p_movement += _b_move_speed;
        }
    }
    else
    {
        // Not currently moving - accept new input and start moving
        if (b_moving_box != -1)
        {
            // Check if the box has been moved onto a red tile
            var tile = Math.floor(b_pos_y[b_moving_box] / 16) * _m_width + Math.floor(b_pos_x[b_moving_box] / 16);
            if (_m_tile_map[m_level][tile] == 2)
            {
                // It has, so turn the red tile green
                _m_tile_map[m_level][tile] = 3;
            }
            
            // Check if the box has been moved off a green tile
            tile = Math.floor(p_pos_y / 16) * _m_width + Math.floor(p_pos_x / 16);;
            if (_m_tile_map[m_level][tile] == 3)
            {
                // It has, so turn the green tile red
                _m_tile_map[m_level][tile] = 2;
            }

            b_moving_box = -1;

            // Check all boxes are over green tiles (level is complete)
            var complete = true;
            for (var i = 0; i < b_count; i++)
            {
                tile = Math.floor(b_pos_y[i] / 16) * _m_width + Math.floor(b_pos_x[i] / 16);

                if (_m_tile_map[m_level][tile] != 3)
                {
                    complete = false;
                    i = b_count;
                }
            }
            if (complete)
            {
                changeLevel(m_level + 1);
            }
        }

        if (i_keys[1] != i_keys[3])
        {
            // Horizontal direction has been pressed
            var tile = Math.floor(p_pos_y / 16) * _m_width + Math.floor(p_pos_x / 16);

            if (i_keys[1])
            {
                // Left was pressed
                p_direction = 1;

                if (_m_tile_map[m_level][tile - 1] != 1)
                {
                    p_movement = 0;

                    for (var i = 0; i < b_count; i++)
                    {
                        if (b_pos_y[i] == p_pos_y)
                        {
                            if (b_pos_x[i] == p_pos_x - 16)
                            {
                                if (_m_tile_map[m_level][tile - 2] != 1)
                                {
                                    b_moving_box = i;

                                    for (var j = 0; j < b_count; j++)
                                    {
                                        if ((b_pos_y[j] == p_pos_y) && (b_pos_x[j] == p_pos_x - 32))
                                        {
                                            b_moving_box = -1;
                                            p_movement = 16;
                                        }
                                    }
                                }
                                else
                                {
                                    p_movement = 16;
                                }
                                i = b_count;
                            }
                        }
                    }
                }
            }
            else
            {
                // Right was pressed
                p_direction = 3;

                if (_m_tile_map[m_level][tile + 1] != 1)
                {
                    p_movement = 0;

                    for (var i = 0; i < b_count; i++)
                    {
                        if (b_pos_y[i] == p_pos_y)
                        {
                            if (b_pos_x[i] == p_pos_x + 16)
                            {
                                if (_m_tile_map[m_level][tile + 2] != 1)
                                {
                                    b_moving_box = i;

                                    for (var j = 0; j < b_count; j++)
                                    {
                                        if ((b_pos_y[j] == p_pos_y) && (b_pos_x[j] == p_pos_x + 32))
                                        {
                                            b_moving_box = -1;
                                            p_movement = 16;
                                        }
                                    }
                                }
                                else
                                {
                                    p_movement = 16;
                                }
                                i = b_count;
                            }
                        }
                    }
                }
            }
        }
        else if (i_keys[0] != i_keys[2])
        {
            // Vertical direction has been pressed
            var x_tile = Math.floor(p_pos_x / 16);
            var y_tile = Math.floor(p_pos_y / 16);
            var tile = y_tile * _m_width + x_tile;

            if (i_keys[0])
            {
                // Down was pressed
                p_direction = 0;

                if (_m_tile_map[m_level][tile + _m_width] != 1)
                {
                    p_movement = 0;

                    for (var i = 0; i < b_count; i++)
                    {
                        if (b_pos_x[i] == p_pos_x)
                        {
                            if (b_pos_y[i] == p_pos_y + 16)
                            {
                                if (_m_tile_map[m_level][tile + 2 * _m_width] != 1)
                                {
                                    b_moving_box = i;

                                    for (var j = 0; j < b_count; j++)
                                    {
                                        if ((b_pos_y[j] == p_pos_y + 32) && (b_pos_x[j] == p_pos_x))
                                        {
                                            b_moving_box = -1;
                                            p_movement = 16;
                                        }
                                    }
                                }
                                else
                                {
                                    p_movement = 16;
                                }
                                i = b_count;
                            }
                        }
                    }
                }
            }
            else
            {
                 // Up was pressed
                p_direction = 2;

                if (_m_tile_map[m_level][tile - _m_width] != 1)
                {
                    p_movement = 0;

                    for (var i = 0; i < b_count; i++)
                    {
                        if (b_pos_x[i] == p_pos_x)
                        {
                            if (b_pos_y[i] == p_pos_y - 16)
                            {
                                if (_m_tile_map[m_level][tile - 2 * _m_width] != 1)
                                {
                                    b_moving_box = i;

                                    for (var j = 0; j < b_count; j++)
                                    {
                                        if ((b_pos_y[j] == p_pos_y - 32) && (b_pos_x[j] == p_pos_x))
                                        {
                                            b_moving_box = -1;
                                            p_movement = 16;
                                        }
                                    }
                                }
                                else
                                {
                                    p_movement = 16;
                                }
                                i = b_count;
                            }
                        }
                    }
                }
            }
        }
    }

    for (var i = 0; i < b_count; i++)
    {
        context.drawImage(spr_chest, b_pos_x[i], b_pos_y[i]);
    }

    context.drawImage(spr_penguin[2 * p_direction + p_anim_frame], p_pos_x, p_pos_y);
}

function changeLevel(level)
{
    for (var i = 0; i < _m_width * _m_height; i++)
    {
        if (_m_tile_map[level][i] == 3)
        {
            _m_tile_map[level][i] = 2;
        }
    }

    b_pos_x.length = 0;
    b_pos_y.length = 0;
    b_count = 0;

    p_pos_x = 16 * _m_entities[level][0];
    p_pos_y = 16 * _m_entities[level][1];

    for (var i = 2; i < _m_entities[level].length; i += 2)
    {
        var x = _m_entities[level][i];
        var y = _m_entities[level][i+1];

        b_pos_x.push(16 * x);
        b_pos_y.push(16 * y);
        b_count++;

        if (_m_tile_map[level][y * _m_width + x] == 2)
        {
            _m_tile_map[level][y * _m_width + x] = 3;
        }
    }

    // Penguin:
    p_anim_frame = 0;
    p_anim_progress = 0;
    p_direction = 0; // 0: down, 1: left, 2: up, 3: right
    p_movement = 16;

    // Boxes:
    b_moving_box = -1; // -1: none, otherwise this is the index in array

    m_level = level;
}

function onKeyDown(e)
{
    switch (e.keyCode)
    {
        case 37:
            i_keys[1] = true;
            break;
            
        case 38:
            i_keys[2] = true;
            break;

        case 39:
            i_keys[3] = true;
            break;
            
        case 40:
            i_keys[0] = true;
            break;

        case 82: // R key, resets level
            changeLevel(m_level);
            break;
    }
}

function onKeyUp(e)
{
    switch (e.keyCode)
    {
        case 37:
            i_keys[1] = false;
            break;
            
        case 38:
            i_keys[2] = false;
            break;

        case 39:
            i_keys[3] = false;
            break;
            
        case 40:
            i_keys[0] = false;
            break;
    }
}
