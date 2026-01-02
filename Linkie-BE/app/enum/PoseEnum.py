from enum import Enum

class PoseEnum(str, Enum):
    HANDS_UP = "hands_up"                  # Giơ bàn tay lên giống nút like
    WAVE = "wave"                          # Chào (vẫy tay)
    TWO_FINGERS = "two_fingers"            # Giơ 2 ngón
    THREE_FINGERS = "three_fingers"        # Giơ 3 ngón
    HEART_HANDS = "heart_hands"            # Tạo hình trái tim bằng tay
    OK_SIGN = "ok_sign"                    # Dấu OK
    SALUTE = "salute"                      # Chào theo kiểu chào quân đội
    POINT_RIGHT = "point_right"            # Chỉ tay sang phải

POSE_SAMPLE_IMAGES = {
    PoseEnum.HANDS_UP:          "static/images/pose_samples/hands_up.png",
    PoseEnum.WAVE:              "static/images/pose_samples/wave.png",
    PoseEnum.TWO_FINGERS:       "static/images/pose_samples/two_fingers.png",
    PoseEnum.THREE_FINGERS:     "static/images/pose_samples/three_fingers.png",
    PoseEnum.HEART_HANDS:       "static/images/pose_samples/heart_hands.png",
    PoseEnum.OK_SIGN:           "static/images/pose_samples/ok_sign.png",
    PoseEnum.SALUTE:            "static/images/pose_samples/salute.png",
    PoseEnum.POINT_RIGHT:       "static/images/pose_samples/point_right.png",
}