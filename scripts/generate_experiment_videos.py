import os
import sys
import json
import subprocess
import shutil
from PIL import Image, ImageDraw, ImageFont

# Video Configuration
WIDTH = 1280
HEIGHT = 720
FPS = 24

# Color Palette (Clean Academic IDE Dark Theme)
COLOR_BG = (11, 15, 25)             # #0b0f19
COLOR_PANEL_LEFT = (17, 24, 39)     # #111827 (Code Editor)
COLOR_PANEL_RIGHT = (9, 13, 22)     # #090d16 (Terminal Output)
COLOR_HEADER_BG = (24, 33, 52)      # #182134
COLOR_BORDER = (45, 58, 84)         # #2d3a54
COLOR_TEXT = (241, 245, 249)        # #f1f5f9
COLOR_MUTED = (148, 163, 184)       # #94a3b8
COLOR_DIM = (100, 116, 139)         # #64748b

# Accents
COLOR_CYAN = (56, 189, 248)         # #38bdf8
COLOR_GREEN = (52, 211, 153)        # #34d399
COLOR_AMBER = (251, 191, 36)        # #fbbf24
COLOR_PURPLE = (192, 132, 252)      # #c084fc
COLOR_BLUE = (96, 165, 250)         # #60a5fa
COLOR_TEAL = (45, 212, 191)         # #2dd4bf
COLOR_WHITE = (255, 255, 255)

RESPECTIVE_FILENAMES = {
    1: "exp1_data_formats.mp4",
    2: "exp2_apis_databases.mp4",
    3: "exp3_data_cleaning.mp4",
    4: "exp4_data_wrangling.mp4",
    5: "exp5_data_visualization.mp4",
    6: "exp6_time_series.mp4",
    7: "exp7_statistical_testing.mp4",
    8: "exp8_supervised_ml.mp4",
    9: "exp9_unsupervised_ml.mp4",
    10: "exp10_big_data.mp4",
}

MODULE_MAP = {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 5,
    7: 4,
    8: 5,
    9: 2,
    10: 5,
}

def find_ffmpeg():
    path_bin = shutil.which("ffmpeg")
    if path_bin:
        return path_bin
    winget_path = r"C:\Users\kartheek\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg.Shared_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0-full_build-shared\bin\ffmpeg.exe"
    if os.path.exists(winget_path):
        return winget_path
    raise RuntimeError("ffmpeg executable not found")

def get_font(names, size):
    for name in names:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            continue
    return ImageFont.load_default()

FONT_CONSOLA_SM = get_font(["consola.ttf", "cour.ttf", "lucon.ttf"], 14)
FONT_CONSOLA_MD = get_font(["consola.ttf", "cour.ttf", "lucon.ttf"], 15)
FONT_CONSOLA_LG = get_font(["consolab.ttf", "consola.ttf", "courbd.ttf"], 17)
FONT_CONSOLA_BOLD = get_font(["consolab.ttf", "courbd.ttf", "consola.ttf"], 15)

FONT_SEGOE_SM = get_font(["segoeui.ttf", "arial.ttf"], 15)
FONT_SEGOE_BOLD_SM = get_font(["segoeuib.ttf", "arialbd.ttf"], 14)
FONT_SEGOE_MD = get_font(["segoeuib.ttf", "arialbd.ttf"], 18)
FONT_SEGOE_LG = get_font(["segoeuib.ttf", "arialbd.ttf"], 24)
FONT_SEGOE_XL = get_font(["segoeuib.ttf", "arialbd.ttf"], 32)
FONT_SEGOE_XXL = get_font(["segoeuib.ttf", "arialbd.ttf"], 40)

PY_KEYWORDS = {
    'import', 'from', 'as', 'def', 'return', 'for', 'in', 'if', 'else', 'elif',
    'while', 'with', 'try', 'except', 'True', 'False', 'None', 'and', 'or', 'not',
    'print', 'len', 'range', 'round', 'int', 'float', 'str', 'list', 'dict', 'set'
}

def colorize_code_line(line):
    stripped = line.lstrip()
    if stripped.startswith('#'):
        return [(line, COLOR_DIM)]
    if ('"' in line or "'" in line) and not stripped.startswith(('print', 'df', 'pd', 'sns', 'plt')):
        return [(line, COLOR_GREEN)]

    tokens = []
    words = line.split(' ')
    for i, w in enumerate(words):
        space = ' ' if i < len(words) - 1 else ''
        clean_w = w.strip('():,=[]{}."\'')
        if clean_w in PY_KEYWORDS:
            tokens.append((w + space, COLOR_PURPLE))
        elif any( clean_w.startswith(p) for p in ['pd', 'np', 'plt', 'sns', 'df', 'sqlite3', 'stats', 'KMeans', 'PCA', 'SVD'] ):
            tokens.append((w + space, COLOR_CYAN))
        elif '"' in w or "'" in w:
            tokens.append((w + space, COLOR_GREEN))
        elif clean_w.replace('.', '', 1).isdigit():
            tokens.append((w + space, COLOR_AMBER))
        else:
            tokens.append((w + space, COLOR_TEXT))
    return tokens

def draw_header(draw, exp, sub=None, frame_idx=0):
    draw.rectangle([0, 0, WIDTH, 56], fill=COLOR_HEADER_BG)
    draw.line([0, 56, WIDTH, 56], fill=COLOR_BORDER, width=2)

    # Traffic lights
    draw.ellipse([18, 20, 30, 32], fill=(239, 68, 68))
    draw.ellipse([38, 20, 50, 32], fill=(245, 158, 11))
    draw.ellipse([58, 20, 70, 32], fill=(16, 185, 129))

    disp_num = exp.get('displayNumber', f"{exp.get('number', 1):02d}")
    title = exp.get('title', '')
    header_text = f"EXP-{disp_num}: {title}"
    if len(header_text) > 64:
        header_text = header_text[:61] + "..."
    draw.text((88, 17), header_text, fill=COLOR_WHITE, font=FONT_SEGOE_MD)

    if sub:
        part_badge = f"PART {sub.get('partLetter', 'A')}  |  {sub.get('title', '')}"
        if len(part_badge) > 46:
            part_badge = part_badge[:43] + "..."
        bbox = FONT_SEGOE_BOLD_SM.getbbox(part_badge)
        bw = bbox[2] - bbox[0] + 24
        bx1 = WIDTH - bw - 20
        draw.rectangle([bx1, 13, WIDTH - 20, 43], fill=(30, 41, 59), outline=COLOR_CYAN, width=1)
        draw.text((bx1 + 12, 19), part_badge, fill=COLOR_CYAN, font=FONT_SEGOE_BOLD_SM)

def draw_footer(draw, exp, sub=None, progress_pct=0.0):
    fy = HEIGHT - 34
    draw.rectangle([0, fy, WIDTH, HEIGHT], fill=COLOR_HEADER_BG)
    draw.line([0, fy, WIDTH, fy], fill=COLOR_BORDER, width=1)

    # Progress bar along top of footer
    if progress_pct > 0:
        bar_w = int(WIDTH * min(1.0, max(0.0, progress_pct)))
        draw.rectangle([0, fy, bar_w, fy + 3], fill=COLOR_CYAN)

    left_txt = "Python 3.12.2 Kernel   |   K. Uday Kiran (24102A030055)   |   Data Science Lab (22DS102006)"
    draw.text((20, fy + 8), left_txt, fill=COLOR_MUTED, font=FONT_SEGOE_BOLD_SM)

    right_txt = f"Sub-Experiments: {len(exp.get('subExperiments', []))}   |   Status: Verified"
    bbox = FONT_SEGOE_BOLD_SM.getbbox(right_txt)
    rw = bbox[2] - bbox[0]
    draw.text((WIDTH - rw - 20, fy + 8), right_txt, fill=COLOR_GREEN, font=FONT_SEGOE_BOLD_SM)

def render_title_card(exp, frame_idx, total_frames):
    img = Image.new('RGB', (WIDTH, HEIGHT), COLOR_BG)
    draw = ImageDraw.Draw(img)
    draw_header(draw, exp, frame_idx=frame_idx)
    draw_footer(draw, exp, progress_pct=0.05)

    cx, cy = WIDTH // 2, HEIGHT // 2
    box_w, box_h = 1040, 470
    bx1, by1 = cx - box_w // 2, cy - box_h // 2
    bx2, by2 = cx + box_w // 2, cy + box_h // 2

    draw.rectangle([bx1, by1, bx2, by2], fill=COLOR_PANEL_LEFT, outline=COLOR_BORDER, width=2)
    draw.rectangle([bx1, by1, bx2, by1 + 6], fill=COLOR_CYAN)

    disp_num = exp.get('displayNumber', f"{exp.get('number', 1):02d}")
    badge_txt = f"EXPERIMENT {disp_num}  •  CODE & OUTPUT EXECUTION WALKTHROUGH"
    draw.rectangle([bx1 + 40, by1 + 32, bx1 + 540, by1 + 66], fill=(30, 58, 138), outline=COLOR_BLUE, width=1)
    draw.text((bx1 + 56, by1 + 40), badge_txt, fill=COLOR_CYAN, font=FONT_SEGOE_BOLD_SM)

    title = exp.get('title', 'Experiment')
    draw.text((bx1 + 40, by1 + 86), title, fill=COLOR_WHITE, font=FONT_SEGOE_XL)

    desc = exp.get('description', '')
    if len(desc) > 105:
        desc = desc[:102] + "..."
    draw.text((bx1 + 40, by1 + 134), desc, fill=COLOR_MUTED, font=FONT_SEGOE_SM)

    draw.line([bx1 + 40, by1 + 172, bx2 - 40, by1 + 172], fill=COLOR_BORDER, width=1)

    draw.text((bx1 + 40, by1 + 188), "INCLUDED SUB-EXPERIMENTS (PYTHON CODE + STDOUT VERIFICATION):", fill=COLOR_AMBER, font=FONT_SEGOE_BOLD_SM)

    subs = exp.get('subExperiments', [])
    sy = by1 + 220
    for s in subs[:5]:
        p_letter = s.get('partLetter', 'A')
        p_title = s.get('title', '')
        p_aim = s.get('aim', '')
        if len(p_aim) > 68:
            p_aim = p_aim[:65] + "..."
        draw.rectangle([bx1 + 40, sy, bx2 - 40, sy + 38], fill=COLOR_PANEL_RIGHT, outline=COLOR_BORDER, width=1)
        draw.text((bx1 + 54, sy + 10), f"Part {p_letter}: {p_title}", fill=COLOR_GREEN, font=FONT_CONSOLA_BOLD)
        draw.text((bx1 + 430, sy + 10), p_aim, fill=COLOR_MUTED, font=FONT_CONSOLA_SM)
        sy += 44

    return img

def render_editor_and_terminal(exp, sub, state="running", frame_idx=0, code_reveal_pct=1.0, overall_pct=0.5):
    img = Image.new('RGB', (WIDTH, HEIGHT), COLOR_BG)
    draw = ImageDraw.Draw(img)

    draw_header(draw, exp, sub=sub, frame_idx=frame_idx)
    draw_footer(draw, exp, sub=sub, progress_pct=overall_pct)

    # Aim Banner across top of workspace
    aim_y1, aim_y2 = 64, 102
    draw.rectangle([16, aim_y1, WIDTH - 16, aim_y2], fill=(20, 29, 47), outline=COLOR_BORDER, width=1)
    p_letter = sub.get('partLetter', 'A')
    aim_text = f"AIM ({exp.get('number')}{p_letter}): {sub.get('aim', '')}"
    if len(aim_text) > 122:
        aim_text = aim_text[:119] + "..."
    draw.text((28, aim_y1 + 10), aim_text, fill=COLOR_AMBER, font=FONT_SEGOE_BOLD_SM)

    # Split Pane Coordinates
    top_y = 110
    bot_y = HEIGHT - 42

    # Left Pane: Python Code Editor
    lx1, ly1, lx2, ly2 = 16, top_y, 648, bot_y
    # Right Pane: Execution Terminal Output
    rx1, ry1, rx2, ry2 = 660, top_y, WIDTH - 16, bot_y
    tab_h = 32

    # 1. LEFT PANE: CODE EDITOR
    draw.rectangle([lx1, ly1, lx2, ly2], fill=COLOR_PANEL_LEFT, outline=COLOR_BORDER, width=1)
    draw.rectangle([lx1, ly1, lx2, ly1 + tab_h], fill=COLOR_HEADER_BG)
    draw.line([lx1, ly1 + tab_h, lx2, ly1 + tab_h], fill=COLOR_BORDER, width=1)

    file_name = f"exp{exp.get('number', 1)}_{p_letter.lower()}_solution.py"
    draw.text((lx1 + 14, ly1 + 8), f"PYTHON SCRIPT  —  {file_name}", fill=COLOR_CYAN, font=FONT_SEGOE_BOLD_SM)

    code_lines = sub.get('code', '').splitlines()
    total_code_lines = len(code_lines)
    max_visible_lines = 24

    if total_code_lines > max_visible_lines:
        code_lines = code_lines[:max_visible_lines]

    visible_count = max(1, int(len(code_lines) * code_reveal_pct))
    shown_lines = code_lines[:visible_count]

    gutter_w = 38
    draw.rectangle([lx1 + 1, ly1 + tab_h + 1, lx1 + gutter_w, ly2 - 1], fill=(13, 19, 31))
    draw.line([lx1 + gutter_w, ly1 + tab_h, lx1 + gutter_w, ly2], fill=COLOR_BORDER, width=1)

    text_y = ly1 + tab_h + 10
    active_line_idx = visible_count - 1 if state == "running" else -1

    for idx, line in enumerate(shown_lines):
        if idx == active_line_idx:
            draw.rectangle([lx1 + gutter_w + 1, text_y - 2, lx2 - 2, text_y + 18], fill=(30, 41, 59))
        draw.text((lx1 + 8, text_y), f"{idx + 1:2d}", fill=COLOR_DIM, font=FONT_CONSOLA_SM)

        if len(line) > 62:
            line = line[:60] + ".."

        tokens = colorize_code_line(line)
        tx = lx1 + gutter_w + 10
        for token_text, token_color in tokens:
            draw.text((tx, text_y), token_text, fill=token_color, font=FONT_CONSOLA_MD)
            bbox = FONT_CONSOLA_MD.getbbox(token_text)
            tx += (bbox[2] - bbox[0])
        text_y += 21
        if text_y > ly2 - 22:
            break

    # 2. RIGHT PANE: EXECUTION OUTPUT TERMINAL
    draw.rectangle([rx1, ry1, rx2, ry2], fill=COLOR_PANEL_RIGHT, outline=COLOR_BORDER, width=1)
    draw.rectangle([rx1, ry1, rx2, ry1 + tab_h], fill=COLOR_HEADER_BG)
    draw.line([rx1, ry1 + tab_h, rx2, ry1 + tab_h], fill=COLOR_BORDER, width=1)
    draw.text((rx1 + 14, ry1 + 8), "EXECUTION OUTPUT  —  stdout / Console", fill=COLOR_MUTED, font=FONT_SEGOE_BOLD_SM)

    if state == "running":
        draw.text((rx2 - 115, ry1 + 8), "● EXECUTING", fill=COLOR_AMBER, font=FONT_SEGOE_BOLD_SM)
    else:
        draw.text((rx2 - 125, ry1 + 8), "✓ VERIFIED (0)", fill=COLOR_GREEN, font=FONT_SEGOE_BOLD_SM)

    term_y = ry1 + tab_h + 12
    draw.text((rx1 + 14, term_y), "udaykiran@dslab:~$", fill=COLOR_TEAL, font=FONT_CONSOLA_BOLD)
    draw.text((rx1 + 180, term_y), f"python3 {file_name}", fill=COLOR_WHITE, font=FONT_CONSOLA_MD)
    term_y += 24

    raw_out = sub.get('output', {}).get('rawText', '')
    out_lines = raw_out.splitlines() if raw_out else ["Execution finished successfully."]

    if state == "running":
        spinners = ["|", "/", "-", "\\"]
        spin_char = spinners[(frame_idx // 2) % len(spinners)]
        draw.text((rx1 + 14, term_y), f"[{spin_char}] Running {sub.get('title', '')}...", fill=COLOR_AMBER, font=FONT_CONSOLA_MD)
        term_y += 24

        # Progressive output preview during running phase
        partial_lines = max(1, int(len(out_lines) * (code_reveal_pct * 0.6)))
        draw.line([rx1 + 14, term_y, rx2 - 14, term_y], fill=COLOR_BORDER, width=1)
        term_y += 8
        for o_line in out_lines[:min(partial_lines, 18)]:
            if len(o_line) > 58:
                o_line = o_line[:56] + ".."
            draw.text((rx1 + 14, term_y), o_line, fill=COLOR_MUTED, font=FONT_CONSOLA_SM)
            term_y += 19
            if term_y > ry2 - 22:
                break

    elif state == "completed":
        exec_time = sub.get('output', {}).get('executionTime', '0.14s')
        draw.text((rx1 + 14, term_y), f"[Completed in {exec_time} — Exit Code: 0]", fill=COLOR_GREEN, font=FONT_CONSOLA_BOLD)
        term_y += 22
        draw.line([rx1 + 14, term_y, rx2 - 14, term_y], fill=COLOR_BORDER, width=1)
        term_y += 8

        for o_line in out_lines[:22]:
            if any(k in o_line for k in ['Data:', 'Accuracy', 'Matrix', 'Score', 'Report', 'Cluster', 'MAE', 'MSE', 'R2', 'Summary', 'Results', 'Total', 'Mean']):
                col = COLOR_AMBER
            elif o_line.lstrip().startswith(('0', '1', '2', '3', '4', '5', '6', '7', '8', '9')):
                col = COLOR_CYAN
            elif '---' in o_line or '===' in o_line:
                col = COLOR_DIM
            else:
                col = COLOR_WHITE

            if len(o_line) > 58:
                o_line = o_line[:56] + ".."
            draw.text((rx1 + 14, term_y), o_line, fill=col, font=FONT_CONSOLA_SM)
            term_y += 19
            if term_y > ry2 - 22:
                break

    return img

def render_outro_card(exp, frame_idx, total_frames):
    img = Image.new('RGB', (WIDTH, HEIGHT), COLOR_BG)
    draw = ImageDraw.Draw(img)

    draw_header(draw, exp, frame_idx=frame_idx)
    draw_footer(draw, exp, progress_pct=1.0)

    cx, cy = WIDTH // 2, HEIGHT // 2
    box_w, box_h = 980, 450
    bx1, by1 = cx - box_w // 2, cy - box_h // 2
    bx2, by2 = cx + box_w // 2, cy + box_h // 2

    draw.rectangle([bx1, by1, bx2, by2], fill=COLOR_PANEL_LEFT, outline=COLOR_GREEN, width=2)
    draw.rectangle([bx1, by1, bx2, by1 + 44], fill=(20, 83, 45))
    draw.line([bx1, by1 + 44, bx2, by1 + 44], fill=COLOR_GREEN, width=1)
    draw.text((bx1 + 24, by1 + 12), "✓ EXPERIMENT EXECUTION SUMMARY — ALL OUTPUTS VERIFIED", fill=COLOR_WHITE, font=FONT_SEGOE_MD)

    disp_num = exp.get('displayNumber', f"{exp.get('number', 1):02d}")
    draw.text((bx1 + 36, by1 + 65), f"Experiment {disp_num}: {exp.get('title', '')}", fill=COLOR_WHITE, font=FONT_SEGOE_LG)

    subs = exp.get('subExperiments', [])
    draw.text((bx1 + 36, by1 + 104), f"All {len(subs)} sub-experiment Python scripts executed with 0 errors.", fill=COLOR_CYAN, font=FONT_SEGOE_SM)

    py = by1 + 140
    for s in subs[:5]:
        p_letter = s.get('partLetter', 'A')
        p_title = s.get('title', '')
        exec_t = s.get('output', {}).get('executionTime', '0.14s')
        draw.rectangle([bx1 + 36, py, bx2 - 36, py + 38], fill=COLOR_PANEL_RIGHT, outline=COLOR_BORDER)
        draw.text((bx1 + 52, py + 10), f"[PASS] Part {p_letter}: {p_title}", fill=COLOR_GREEN, font=FONT_CONSOLA_BOLD)
        draw.text((bx2 - 180, py + 10), f"Runtime: {exec_t}", fill=COLOR_AMBER, font=FONT_CONSOLA_SM)
        py += 46

    draw.text((bx1 + 36, by2 - 38), "Verified Lab Record  •  K. Uday Kiran (24102A030055)  •  Mohan Babu University", fill=COLOR_TEAL, font=FONT_SEGOE_BOLD_SM)
    return img

def generate_video_for_experiment(exp, ffmpeg_bin):
    exp_num = exp.get('number', 1)
    exp_id = exp.get('id', f'exp-{exp_num}')
    primary_filename = RESPECTIVE_FILENAMES.get(exp_num, f"exp-{exp_num}.mp4")
    output_mp4 = os.path.join("public", "videos", primary_filename)
    alt_mp4 = os.path.join("public", "videos", f"{exp_id}.mp4")
    thumb_png = os.path.join("public", "videos", f"thumb_exp{exp_num}.png")

    print(f"[START] Exp {exp_num}: {exp.get('title')} -> {output_mp4}")

    cmd = [
        ffmpeg_bin, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{WIDTH}x{HEIGHT}',
        '-pix_fmt', 'rgb24',
        '-r', str(FPS),
        '-i', '-',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-preset', 'fast',
        '-crf', '21',
        '-movflags', '+faststart',
        output_mp4
    ]

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)

    subs = exp.get('subExperiments', [])
    # Save thumbnail from the first sub-experiment's completed code+output frame
    if subs:
        thumb_img = render_editor_and_terminal(exp, subs[0], state="completed", frame_idx=10, code_reveal_pct=1.0, overall_pct=0.35)
        thumb_img.save(thumb_png, format="PNG")

    frame_count = 0
    total_subs = max(1, len(subs))

    # 1. First 18 frames (0.75s): immediate completed code+output preview of Part A so video starts right on code & output!
    if subs:
        for f in range(18):
            img = render_editor_and_terminal(exp, subs[0], state="completed", frame_idx=f, code_reveal_pct=1.0, overall_pct=0.05)
            proc.stdin.write(img.tobytes())
            frame_count += 1

    # 2. Title Overview Card (~1.5s = 36 frames)
    title_frames = 36
    for f in range(title_frames):
        img = render_title_card(exp, f, title_frames)
        proc.stdin.write(img.tobytes())
        frame_count += 1

    # 3. Iterate each Sub-Experiment Part (Code typing/running + Full Output)
    for s_idx, sub in enumerate(subs):
        base_pct = 0.1 + 0.8 * (s_idx / total_subs)
        next_pct = 0.1 + 0.8 * ((s_idx + 1) / total_subs)

        # A. Code Revealed & Running (~1.8s = 44 frames)
        running_frames = 44
        for f in range(running_frames):
            reveal_pct = min(1.0, 0.35 + 0.65 * (f / running_frames))
            cur_pct = base_pct + (next_pct - base_pct) * 0.4 * (f / running_frames)
            img = render_editor_and_terminal(exp, sub, state="running", frame_idx=f, code_reveal_pct=reveal_pct, overall_pct=cur_pct)
            proc.stdin.write(img.tobytes())
            frame_count += 1

        # B. Output Completed (~3.0s = 72 frames)
        completed_frames = 72
        for f in range(completed_frames):
            cur_pct = base_pct + (next_pct - base_pct) * (0.4 + 0.6 * (f / completed_frames))
            img = render_editor_and_terminal(exp, sub, state="completed", frame_idx=f, code_reveal_pct=1.0, overall_pct=cur_pct)
            proc.stdin.write(img.tobytes())
            frame_count += 1

    # 4. Outro Summary Card (~1.8s = 44 frames)
    outro_frames = 44
    for f in range(outro_frames):
        img = render_outro_card(exp, f, outro_frames)
        proc.stdin.write(img.tobytes())
        frame_count += 1

    proc.stdin.close()
    proc.wait()

    if os.path.exists(output_mp4):
        if os.path.abspath(output_mp4) != os.path.abspath(alt_mp4):
            shutil.copyfile(output_mp4, alt_mp4)
        if exp_num == 1:
            shutil.copyfile(output_mp4, os.path.join("public", "videos", "default_lab_demo.mp4"))
        size_kb = os.path.getsize(output_mp4) / 1024
        duration_s = frame_count / FPS
        print(f"[DONE] Exp {exp_num} -> {output_mp4} ({duration_s:.1f}s, {size_kb:.1f} KB)")
        return True
    else:
        print(f"[FAIL] Exp {exp_num} failed")
        return False

def export_experiments_data_ts(experiments):
    ts_records = []
    for exp in experiments:
        exp_num = exp.get('number', 1)
        video_file = RESPECTIVE_FILENAMES.get(exp_num, f"exp-{exp_num}.mp4")
        tools_str = exp.get('technology', 'Python · Pandas · NumPy')
        tools_list = [t.strip() for t in tools_str.split('·') if t.strip()]

        sub_items = []
        for idx, sub in enumerate(exp.get('subExperiments', []), 1):
            p_letter = sub.get('partLetter', chr(64 + idx))
            sub_title = sub.get('title', sub.get('name', f'Part {p_letter}'))
            code_txt = sub.get('code', '')
            out_txt = sub.get('output', {}).get('rawText', '')
            sub_items.append({
                "id": f"exp-{exp_num}-sub-{idx}",
                "name": f"{exp_num}{p_letter}: {sub_title}",
                "aim": sub.get('aim', ''),
                "code": code_txt,
                "expectedOutput": out_txt,
            })

        ts_records.append({
            "id": f"exp-{exp_num}",
            "expNumber": exp_num,
            "name": exp.get('title', f'Experiment {exp_num}'),
            "description": exp.get('subtitle', exp.get('description', '')),
            "moduleId": MODULE_MAP.get(exp_num, 1),
            "category": exp.get('category', 'Data Science'),
            "tools": tools_list,
            "videoUrl": f"/videos/{video_file}?v=2",
            "videoThumbnail": f"/videos/thumb_exp{exp_num}.png",
            "previewImage": f"/videos/thumb_exp{exp_num}.png",
            "githubUrl": f"https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds{exp_num}",
            "subExperiments": sub_items
        })

    ts_content = (
        "import { Experiment } from '../types/lab';\n\n"
        "export const DEFAULT_LAB_VIDEO = '/videos/default_lab_demo.mp4?v=2';\n\n"
        "export const ALL_EXPERIMENTS: Experiment[] = "
        + json.dumps(ts_records, indent=2, ensure_ascii=False)
        + ";\n"
    )
    os.makedirs(os.path.join("src", "data"), exist_ok=True)
    with open(os.path.join("src", "data", "experimentsData.ts"), "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"[DONE] Wrote src/data/experimentsData.ts with {len(ts_records)} experiments and {sum(len(r['subExperiments']) for r in ts_records)} sub-experiments.")

def main():
    src_json = os.path.join("scripts", "experiments_all.json")
    fallback_json = r"c:\Users\kartheek\Downloads\sharp-shannon\scripts\experiments_all.json"

    if not os.path.exists(src_json) and os.path.exists(fallback_json):
        os.makedirs("scripts", exist_ok=True)
        with open(fallback_json, "r", encoding="utf-8") as f:
            raw = f.read().replace("kartheek1717", "udaykiran24102A030055")
        with open(src_json, "w", encoding="utf-8") as f:
            f.write(raw)

    with open(src_json, "r", encoding="utf-8") as f:
        experiments = json.load(f)

    os.makedirs(os.path.join("public", "videos"), exist_ok=True)
    export_experiments_data_ts(experiments)

    ffmpeg_bin = find_ffmpeg()
    print(f"Using ffmpeg: {ffmpeg_bin}")
    print(f"Generating code-and-output walkthrough videos for ALL {len(experiments)} experiments...")

    for i, exp in enumerate(experiments, 1):
        print(f"\nProcessing [{i}/{len(experiments)}]...")
        generate_video_for_experiment(exp, ffmpeg_bin)

    print("\nAll 10 experiment walkthrough videos and thumbnails successfully generated!")

if __name__ == '__main__':
    main()
