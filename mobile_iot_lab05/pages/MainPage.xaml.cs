namespace mobile_iot_lab05;

public partial class MainPage : ContentPage
{
	int count = 0;

	public MainPage()
	{
		
	}

	private void OnCounterClicked(object sender, EventArgs e)
	{
		count++;

	}
}

