package data;

import java.util.Arrays;

public class strProcess {
    public static void main(String[] args) {
        // String representing an array of numbers
        String numbersString = "[1,2,3,4,5]";

        // Remove brackets and split the string by commas
        String[] numberStrings = numbersString.replaceAll("\\[|\\]", "").split(",");

        // Convert string array to integer array
        int[] numbers = new int[numberStrings.length];
        for (int i = 0; i < numberStrings.length; i++) {
            numbers[i] = Integer.parseInt(numberStrings[i]);
        }

        // Print the integer array
        System.out.println(Arrays.toString(numbers));
    }
}
